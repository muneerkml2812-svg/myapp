import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CategoryTabs } from '@/components/store/category-tabs';
import { ProductCard } from '@/components/store/product-card';
import { store } from '@/routes';

interface Product {
    id: number;
    name: string;
    description?: string | null;
    price: number;
    stock: number;
    image?: string | null;
    category?: string | null;
}

interface CategoryOption {
    id: number;
    name: string;
}

interface StoreProps {
    products: Product[];
    categories: CategoryOption[];
    cartCount: number;
}

export default function Store({ products, categories, cartCount }: StoreProps) {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredProducts =
        selectedCategory === 'All'
            ? products
            : products.filter((p) => p.category === selectedCategory);

    const addToCart = (productId: number) => {
        router.post('/cart', { product_id: productId, quantity: 1 });
    };

    const buyNow = (productId: number) => {
        router.post('/cart', { product_id: productId, quantity: 1 }, {
            onSuccess: () => {
                router.visit('/checkout');
            },
        });
    };

    return (
        <>
            <Head title="Store" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Store</h1>
                        <p className="text-sm text-muted-foreground">Browse our latest products and add them to your cart.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                            Cart items: {cartCount}
                        </div>
                        <Button asChild size="sm">
                            <Link href="/cart">View cart</Link>
                        </Button>
                    </div>
                </div>
                <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} categories={categories} />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} {...product} onAddToCart={addToCart} onBuyNow={buyNow} />
                    ))}
                </div>
                {filteredProducts.length === 0 && (
                    <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                        No products found in this category.
                    </div>
                )}
            </div>
        </>
    );
}

Store.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Store',
            href: props.currentTeam ? store(props.currentTeam.slug) : '/',
        },
    ],
});
