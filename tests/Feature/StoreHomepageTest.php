<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as AssertableInertia;
use Tests\TestCase;

class StoreHomepageTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_can_show_featured_products(): void
    {
        $category = Category::create([
            'name' => 'Accessories',
            'description' => 'Useful accessories',
        ]);

        Product::create([
            'name' => 'Ergonomic Mouse',
            'description' => 'A smooth mouse',
            'price' => 49.99,
            'stock' => 5,
            'image' => 'https://example.com/mouse.jpg',
            'category_id' => $category->id,
        ]);

        $response = $this->get('/');

        $response->assertOk();
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->has('products', 1)
            ->where('products.0.name', 'Ergonomic Mouse')
        );
    }
}
