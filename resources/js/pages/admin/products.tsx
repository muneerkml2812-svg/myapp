import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { adminProducts } from '@/routes';

interface Product {
    id: number;
    name: string;
    description?: string | null;
    price: number;
    stock: number;
    image?: string | null;
    category?: string | null;
    category_id?: number | null;
}

interface CategoryOption {
    id: number;
    name: string;
}

interface AdminProductsProps {
    products: Product[];
    categories: CategoryOption[];
}

export default function AdminProducts({ products, categories }: AdminProductsProps) {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '0',
        stock: '0',
        image: '',
        category_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/admin/products', form);
    };

    const remove = (id: number) => {
        if (window.confirm('Delete this product?')) {
            router.delete(`/admin/products/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Products" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Catalog</p>
                        <h1 className="text-3xl font-semibold text-foreground">Products</h1>
                    </div>
                    <Button asChild>
                        <Link href="/admin">Back to dashboard</Link>
                    </Button>
                </div>

                <Card className="border-sidebar-border/70 bg-white shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    <CardHeader>
                        <CardTitle>Create product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock</Label>
                                <Input id="stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">Image URL</Label>
                                <Input id="image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Category</Label>
                                <Select value={form.category_id} onValueChange={(value) => setForm({ ...form, category_id: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="md:col-span-2">
                                <Button type="submit">Save product</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid gap-4">
                    {products.map((product) => (
                        <Card key={product.id} className="border-sidebar-border/70 bg-white shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                            <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                                <div className="flex gap-4">
                                    <img src={product.image || 'https://placehold.co/96x96'} alt={product.name} className="size-20 rounded-lg object-cover" />
                                    <div>
                                        <p className="text-lg font-semibold">{product.name}</p>
                                        <p className="text-sm text-muted-foreground">{product.description}</p>
                                        <p className="mt-2 text-sm">Category: {product.category || 'Uncategorized'}</p>
                                        <p className="text-sm">Price: ${product.price.toFixed(2)} · Stock: {product.stock}</p>
                                    </div>
                                </div>
                                <Button variant="destructive" onClick={() => remove(product.id)}>
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
