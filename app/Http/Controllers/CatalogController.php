<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(Request $request): Response
    {
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
