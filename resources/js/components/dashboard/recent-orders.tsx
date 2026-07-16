import { Badge } from '@/components/ui/badge';

const orders = [
    { id: '#ORD-7352', customer: 'John Smith', product: 'iPhone 15 Pro', amount: '$999.00', status: 'Delivered', date: 'Jul 12, 2026' },
    { id: '#ORD-7351', customer: 'Sarah Wilson', product: 'MacBook Pro 14"', amount: '$1,999.00', status: 'Processing', date: 'Jul 12, 2026' },
    { id: '#ORD-7350', customer: 'Mike Johnson', product: 'AirPods Pro 2', amount: '$249.00', status: 'Delivered', date: 'Jul 11, 2026' },
    { id: '#ORD-7349', customer: 'Emily Brown', product: 'Samsung Galaxy S24', amount: '$849.00', status: 'Cancelled', date: 'Jul 11, 2026' },
    { id: '#ORD-7348', customer: 'David Lee', product: 'iPad Pro 12.9"', amount: '$1,099.00', status: 'Delivered', date: 'Jul 10, 2026' },
    { id: '#ORD-7347', customer: 'Lisa Garcia', product: 'Apple Watch Ultra', amount: '$799.00', status: 'Processing', date: 'Jul 10, 2026' },
];

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
    Delivered: 'default',
    Processing: 'secondary',
    Cancelled: 'destructive',
};

export function RecentOrders() {
    return (
        <div className="rounded-xl border border-sidebar-border/70 bg-white shadow-sm dark:border-sidebar-border dark:bg-sidebar">
            <div className="p-6 pb-4">
                <h3 className="text-lg font-semibold">Recent Orders</h3>
                <p className="text-sm text-muted-foreground">Latest transactions</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-t border-sidebar-border/70 dark:border-sidebar-border">
                            <th className="px-6 py-3 text-left font-medium text-muted-foreground">Order ID</th>
                            <th className="px-6 py-3 text-left font-medium text-muted-foreground">Customer</th>
                            <th className="px-6 py-3 text-left font-medium text-muted-foreground">Product</th>
                            <th className="px-6 py-3 text-left font-medium text-muted-foreground">Amount</th>
                            <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
                            <th className="px-6 py-3 text-left font-medium text-muted-foreground">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-t border-sidebar-border/70 dark:border-sidebar-border">
                                <td className="px-6 py-3 font-medium">{order.id}</td>
                                <td className="px-6 py-3 text-muted-foreground">{order.customer}</td>
                                <td className="px-6 py-3">{order.product}</td>
                                <td className="px-6 py-3 font-medium">{order.amount}</td>
                                <td className="px-6 py-3">
                                    <Badge variant={statusVariant[order.status] ?? 'default'}>{order.status}</Badge>
                                </td>
                                <td className="px-6 py-3 text-muted-foreground">{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
