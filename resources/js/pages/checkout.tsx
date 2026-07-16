import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';

interface CheckoutItem {
    product_id: number;
    name: string;
    quantity: number;
    price: number;
    line_total: number;
}

interface CheckoutProps {
    items: CheckoutItem[];
    total: number;
    teamSlug?: string | null;
}

export default function Checkout({ items, total, teamSlug }: CheckoutProps) {
    const { errors = {} } = usePage().props as {
        errors?: Record<string, string | string[]>;
    };
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const getError = (key: string) => {
        const message = errors[key];

        if (!message) {
            return undefined;
        }

        return Array.isArray(message) ? message.join(' ') : message;
    };

    const submit = () => {
        router.post(
            '/checkout/store',
            {
                payment_method: paymentMethod,
                email,
                phone,
                address,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <>
            <Head title="Checkout" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Complete your order</p>
                        <h1 className="text-3xl font-semibold text-foreground">Checkout</h1>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/cart">Back to cart</Link>
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
                                        <li
                                            key={item.product_id}
                                            className="flex items-center justify-between border-b border-border/60 pb-2"
                                        >
                                            <span>
                                                {item.quantity} × {item.name}
                                            </span>
                                            <span>${item.line_total.toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex items-center justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="payment_method">Payment method</Label>
                                        <Select
                                            value={paymentMethod}
                                            onValueChange={setPaymentMethod}
                                        >
                                            <SelectTrigger id="payment_method" aria-label="Payment method">
                                                <SelectValue placeholder="Select a payment method" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="credit_card">
                                                    Credit card
                                                </SelectItem>
                                                <SelectItem value="debit_card">
                                                    Debit card
                                                </SelectItem>
                                                <SelectItem value="paypal">PayPal</SelectItem>
                                                <SelectItem value="cash_on_delivery">
                                                    Cash on delivery
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={getError('payment_method')} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            placeholder="you@example.com"
                                            required
                                        />
                                        <InputError message={getError('email')} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={phone}
                                            onChange={(event) => setPhone(event.target.value)}
                                            placeholder="+1 555 123 4567"
                                            required
                                        />
                                        <InputError message={getError('phone')} />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="address">Shipping address</Label>
                                        <Textarea
                                            id="address"
                                            value={address}
                                            onChange={(event) => setAddress(event.target.value)}
                                            placeholder="123 Main St, Apt 4B, City, Country"
                                            rows={4}
                                            required
                                        />
                                        <InputError message={getError('address')} />
                                    </div>
                                </div>

                                <Button onClick={submit}>Place order</Button>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
