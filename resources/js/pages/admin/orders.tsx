import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';

interface OrderItem {
    name: string;
    quantity: number;
    total: number;
}

interface Order {
    id: number;
    customer: string;
    status: string;
    total: number;
    created_at?: string;
    items: OrderItem[];
}

interface AdminOrdersProps {
    orders: Order[];
}

export default function AdminOrders({ orders }: AdminOrdersProps) {
    return (
        <>
            <Head title="Manage Orders" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Commerce</p>
                    <h1 className="text-3xl font-semibold text-foreground">Orders</h1>
                </div>

                <div className="grid gap-4">
                    {orders.map((order) => (
                        <Card key={order.id} className="border-sidebar-border/70 bg-white shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                            <CardContent className="flex flex-col gap-3 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-semibold">Order #{order.id}</p>
                                        <p className="text-sm text-muted-foreground">Customer: {order.customer}</p>
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
