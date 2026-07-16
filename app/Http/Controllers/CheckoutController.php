<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use InvalidArgumentException;

class CheckoutController extends Controller
{
    public function index(Request $request): Response
    {
        $cart = $request->session()->get('cart', []);

        if (empty($cart)) {
            return Inertia::render('checkout', [
                'items' => [],
                'total' => 0,
                'teamSlug' => $request->user()?->currentTeam?->slug,
            ]);
        }

        $items = [];
        $total = 0;

        foreach ($cart as $productId => $quantity) {
            $product = Product::find($productId);
            if (! $product) {
                continue;
            }

            if ($product->stock < $quantity) {
                throw new InvalidArgumentException('Insufficient stock for '.$product->name);
            }

            $lineTotal = $product->price * $quantity;
            $total += $lineTotal;
            $items[] = [
                'product_id' => $product->id,
                'name' => $product->name,
                'quantity' => $quantity,
                'price' => (float) $product->price,
                'line_total' => (float) $lineTotal,
            ];
        }

        return Inertia::render('checkout', [
            'items' => $items,
            'total' => (float) $total,
            'teamSlug' => $request->user()?->currentTeam?->slug,
        ]);
    }

    public function complete(Request $request, OrderService $orderService)
    {
        $data = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|distinct',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $user = $request->user();
        if (! $user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $order = $orderService->createFromCart($user, $data['items']);

        return response()->json(['order_id' => $order->id, 'total' => $order->total]);
    }

    public function store(Request $request)
    {
        $cart = $request->session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('cart.index');
        }

        $data = $request->validate([
            'payment_method' => 'required|string|in:credit_card,debit_card,paypal,cash_on_delivery',
            'email' => 'required|email',
            'phone' => 'required|string|max:40',
            'address' => 'required|string|max:1000',
        ]);

        return DB::transaction(function () use ($request, $cart, $data) {
            $total = 0;
            $products = Product::whereIn('id', array_keys($cart))->lockForUpdate()->get()->keyBy('id');

            foreach ($cart as $productId => $quantity) {
                $product = $products->get($productId);
                if (! $product) {
                    continue;
                }

                if ($product->stock < $quantity) {
                    throw new InvalidArgumentException('Insufficient stock for '.$product->name);
                }

                $total += $product->price * $quantity;
            }

            $order = Order::create([
                'user_id' => $request->user()->id,
                'total' => $total,
                'status' => 'completed',
                'meta' => [
                    'cart_count' => count($cart),
                    'payment_method' => $data['payment_method'],
                    'email' => $data['email'],
                    'phone' => $data['phone'],
                    'address' => $data['address'],
                ],
            ]);

            foreach ($cart as $productId => $quantity) {
                $product = $products->get($productId);
                if (! $product) {
                    continue;
                }

                $order->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $product->price,
                    'total' => $product->price * $quantity,
                ]);

                $product->decrement('stock', $quantity);
            }

            $request->session()->forget('cart');

            return redirect()->route('orders.index')->with('success', 'Order placed successfully');
        });
    }
}
