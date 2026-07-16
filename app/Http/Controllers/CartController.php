<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(Request $request): Response
    {
        $cart = $request->session()->get('cart', []);
        $items = [];
        $total = 0;

        foreach ($cart as $productId => $quantity) {
            $product = Product::find($productId);
            if (! $product) {
                continue;
            }

            $lineTotal = $product->price * $quantity;
            $total += $lineTotal;

            $items[] = [
                'product_id' => $product->id,
                'name' => $product->name,
                'price' => (float) $product->price,
                'quantity' => $quantity,
                'image' => $product->image,
                'line_total' => (float) $lineTotal,
            ];
        }

        return Inertia::render('cart', [
            'items' => $items,
            'total' => (float) $total,
            'teamSlug' => $request->user()?->currentTeam?->slug,
        ]);
    }

    public function add(Request $request): RedirectResponse
    {
        $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['nullable', 'integer', 'min:1'],
        ]);

        $cart = $request->session()->get('cart', []);
        $productId = (int) $request->input('product_id');
        $quantity = (int) ($request->input('quantity', 1));

        $cart[$productId] = ($cart[$productId] ?? 0) + $quantity;
        $request->session()->put('cart', $cart);

        return redirect()->back();
    }

    public function remove(Request $request, int $productId): RedirectResponse
    {
        $cart = $request->session()->get('cart', []);
        unset($cart[$productId]);
        $request->session()->put('cart', $cart);

        return redirect()->back();
    }

    public function update(Request $request, int $productId): RedirectResponse
    {
        $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $cart = $request->session()->get('cart', []);
        $cart[$productId] = (int) $request->input('quantity');
        $request->session()->put('cart', $cart);

        return redirect()->back();
    }
}
