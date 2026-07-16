import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { adminCategories } from '@/routes';

interface Category {
    id: number;
    name: string;
    description?: string | null;
}

interface AdminCategoriesProps {
    categories: Category[];
}

export default function AdminCategories({ categories }: AdminCategoriesProps) {
    const [form, setForm] = useState({ name: '', description: '' });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/admin/categories', form);
    };

    const remove = (id: number) => {
        if (window.confirm('Delete this category?')) {
            router.delete(`/admin/categories/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Categories" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Catalog</p>
                    <h1 className="text-3xl font-semibold text-foreground">Categories</h1>
                </div>

                <Card className="border-sidebar-border/70 bg-white shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    <CardHeader>
                        <CardTitle>Create category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="grid gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                            </div>
                            <Button type="submit">Save category</Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid gap-4">
                    {categories.map((category) => (
                        <Card key={category.id} className="border-sidebar-border/70 bg-white shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <p className="text-lg font-semibold">{category.name}</p>
                                    <p className="text-sm text-muted-foreground">{category.description || 'No description provided.'}</p>
                                </div>
                                <Button variant="destructive" onClick={() => remove(category.id)}>
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
