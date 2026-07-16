import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CartItem {
    product_id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string | null;
    line_total: number;
}

interface CartProps {
    items: CartItem[];
    total: number;
    teamSlug?: string | null;
}

export default function Cart({ items, total, teamSlug }: CartProps) {
    return (
        <>
            <Head title="Cart" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Your shopping cart</p>
                        <h1 className="text-3xl font-semibold text-foreground">Cart</h1>
                    </div>
                    <Button asChild variant="outline">
                        <Link href={teamSlug ? `/${teamSlug}/store` : '/store'}>Continue shopping</Link>
                    </Button>
                </div>

                <Card className="border-sidebar-border/70 bg-white shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    <CardContent className="flex flex-col gap-4 p-6">
                        {items.length === 0 ? (
                            <p className="text-muted-foreground">Your cart is empty.</p>
                        ) : (
                            <>
                                <ul className="space-y-3">
                                    {items.map((item) => (
                                        <li key={item.product_id} className="flex items-center justify-between border-b border-border/60 pb-2">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="size-7"
                                                        onClick={() => router.patch(`/cart/${item.product_id}`, { quantity: Math.max(1, item.quantity - 1) })}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        −
                                                    </Button>
                                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="size-7"
                                                        onClick={() => router.patch(`/cart/${item.product_id}`, { quantity: item.quantity + 1 })}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                <span className="w-20 text-right font-medium">${item.line_total.toFixed(2)}</span>
                                                <Button variant="destructive" size="sm" onClick={() => router.delete(`/cart/${item.product_id}`)}>
                                                    Remove
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex items-center justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <Button asChild>
                                    <Link href="/checkout">Go to checkout</Link>
                                </Button>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
