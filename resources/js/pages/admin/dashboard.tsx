import { Head } from '@inertiajs/react';
import { Box, Layers, ShoppingCart, Tag } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminDashboardProps {
    productsCount: number;
    categoriesCount: number;
    ordersCount: number;
}

export default function AdminDashboard({ productsCount, categoriesCount, ordersCount }: AdminDashboardProps) {
    const cards = [
        { title: 'Products', value: productsCount, href: '/admin/products', icon: Box },
        { title: 'Categories', value: categoriesCount, href: '/admin/categories', icon: Tag },
        { title: 'Orders', value: ordersCount, href: '/admin/orders', icon: ShoppingCart },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Administration</p>
                        <h1 className="text-3xl font-semibold text-foreground">Admin Dashboard</h1>
                    </div>
                    <Button asChild>
                        <Link href="/admin">Refresh</Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Card key={card.title} className="border-sidebar-border/70 bg-white shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                    <Icon className="size-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-semibold">{card.value}</div>
                                    <p className="mt-2 text-sm text-muted-foreground">Manage {card.title.toLowerCase()} from one place.</p>
                                    <Button className="mt-4" variant="outline" asChild>
                                        <Link href={card.href}>Open</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
