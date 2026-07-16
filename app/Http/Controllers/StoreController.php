<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StoreController extends Controller
{
    public function __invoke(Request $request): Response
    {
        if (! Product::query()->exists()) {
            $airbudsCategory = Category::firstOrCreate([
                'name' => 'Airbuds',
            ], [
                'description' => 'Wireless earbuds and audio accessories.',
            ]);

            $laptopsCategory = Category::firstOrCreate([
                'name' => 'Laptops',
            ], [
                'description' => 'High-performance laptops and productivity notebooks.',
            ]);

            $smartwatchesCategory = Category::firstOrCreate([
                'name' => 'Wearables',
            ], [
                'description' => 'Smartwatches and fitness wearables.',
            ]);

            Product::create([
                'name' => 'Air Buds Pro',
                'description' => 'Premium wireless earbuds with active noise cancellation.',
                'price' => 199.99,
                'stock' => 20,
                'image' => 'https://picsum.photos/seed/airbudspro/600/600',
                'category_id' => $airbudsCategory->id,
            ]);

            Product::create([
                'name' => 'Galaxy Buds Live',
                'description' => 'Comfortable in-ear earbuds with rich sound.',
                'price' => 149.99,
                'stock' => 18,
                'image' => 'https://picsum.photos/seed/galaxybuds/600/600',
                'category_id' => $airbudsCategory->id,
            ]);

            Product::create([
                'name' => 'MacBook Pro 14"',
                'description' => 'Powerful laptop for creators and developers.',
                'price' => 1999.00,
                'stock' => 7,
                'image' => 'https://picsum.photos/seed/macbookpro14/600/600',
                'category_id' => $laptopsCategory->id,
            ]);

            Product::create([
                'name' => 'Dell XPS 15',
                'description' => 'Sleek performance laptop with stunning display.',
                'price' => 1499.00,
                'stock' => 11,
                'image' => 'https://picsum.photos/seed/dellxps15/600/600',
                'category_id' => $laptopsCategory->id,
            ]);

            Product::create([
                'name' => 'Lenovo ThinkPad X1',
                'description' => 'Business laptop with long battery life.',
                'price' => 1299.00,
                'stock' => 9,
                'image' => 'https://picsum.photos/seed/thinkpadx1/600/600',
                'category_id' => $laptopsCategory->id,
            ]);

            Product::create([
                'name' => 'Apple Watch Ultra 2',
                'description' => 'Durable smartwatch for fitness and daily use.',
                'price' => 799.00,
                'stock' => 14,
                'image' => 'https://picsum.photos/seed/watchultra2/600/600',
                'category_id' => $smartwatchesCategory->id,
            ]);
        }

        $products = Product::query()
            ->with('category')
            ->where('stock', '>', 0)
            ->latest()
            ->get()
            ->map(fn (Product $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => (float) $product->price,
                'stock' => $product->stock,
                'image' => $product->image,
                'category' => $product->category?->name,
                'category_id' => $product->category_id,
            ]);

        $categories = Category::query()->get()->map(fn (Category $category) => [
            'id' => $category->id,
            'name' => $category->name,
            'description' => $category->description,
        ]);

        return Inertia::render('store', [
            'products' => $products,
            'categories' => $categories,
            'cartCount' => count($request->session()->get('cart', [])),
        ]);
    }
}
