<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Auth\Authenticatable as UserContract;
use InvalidArgumentException;

class OrderService
{
    /**
     * Create an order from cart items and reduce product stock atomically.
     *
     * @param UserContract $user
     * @param array $items Array of arrays: ['product_id' => int, 'quantity' => int]
     * @param array $meta optional metadata for order
     * @return Order
     */
    public function createFromCart(UserContract $user, array $items, array $meta = []): Order
    {
        if (empty($items)) {
            throw new InvalidArgumentException('Cart items are empty');
        }

        return DB::transaction(function () use ($user, $items, $meta) {
            $total = 0;

            // Lock the selected products FOR UPDATE to avoid race conditions
            $productIds = array_column($items, 'product_id');
            $products = Product::whereIn('id', $productIds)->lockForUpdate()->get()->keyBy('id');

            foreach ($items as $item) {
                $product = $products->get($item['product_id']);
                if (! $product) {
                    throw new InvalidArgumentException('Product not found: '.$item['product_id']);
                }

                $qty = (int) $item['quantity'];
                if ($qty <= 0) {
                    throw new InvalidArgumentException('Invalid quantity for product: '.$product->id);
                }

                if ($product->stock < $qty) {
                    throw new InvalidArgumentException('Insufficient stock for product: '.$product->id);
                }

                $total += $product->price * $qty;
            }

            $order = Order::create([
                'user_id' => $user->getAuthIdentifier(),
                'total' => $total,
                'status' => 'completed',
                'meta' => $meta,
            ]);

            foreach ($items as $item) {
                $product = $products->get($item['product_id']);
                $qty = (int) $item['quantity'];
                $unitPrice = $product->price;
                $lineTotal = $unitPrice * $qty;

                $order->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $qty,
                    'unit_price' => $unitPrice,
                    'total' => $lineTotal,
                ]);

                // Reduce stock
                $product->decrement('stock', $qty);
            }

            return $order;
        });
    }
}
