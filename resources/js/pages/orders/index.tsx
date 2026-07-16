import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';

interface OrderItem {
    name: string;
    quantity: number;
    unit_price: number;
    total: number;
}

interface Order {
    id: number;
    status: string;
    total: number;
    created_at?: string;
    items: OrderItem[];
}

interface OrdersPageProps {
    orders: Order[];
}

export default function OrdersPage({ orders }: OrdersPageProps) {
    return (
        <>
            <Head title="My Orders" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Your account</p>
                    <h1 className="text-3xl font-semibold text-foreground">Orders</h1>
                </div>

                <div className="grid gap-4">
                    {orders.map((order) => (
                        <Card key={order.id} className="border-sidebar-border/70 bg-white shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                            <CardContent className="flex flex-col gap-3 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-semibold">Order #{order.id}</p>
                                        <p className="text-sm text-muted-foreground">{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Recent order'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">{order.status}</p>
                                        <p className="text-sm text-muted-foreground">${order.total.toFixed(2)}</p>
                                    </div>
                                </div>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    {order.items.map((item, idx) => (
                                        <li key={`${order.id}-${idx}`}>
                                            {item.quantity} × {item.name} — ${item.total.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
