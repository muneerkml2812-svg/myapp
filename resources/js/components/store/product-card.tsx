import { Button } from '@/components/ui/button';

interface ProductCardProps {
    id: number;
    name: string;
    category?: string | null;
    price: number;
    image?: string | null;
    stock: number;
    onAddToCart: (id: number) => void;
    onBuyNow: (id: number) => void;
}

export function ProductCard({ id, name, category, price, image, stock, onAddToCart, onBuyNow }: ProductCardProps) {
    return (
        <div className="group overflow-hidden rounded-xl border border-sidebar-border/70 bg-white shadow-sm transition-all hover:shadow-md dark:border-sidebar-border dark:bg-sidebar">
            <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img
                    src={image || 'https://placehold.co/600x600'}
                    alt={name}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
            <div className="p-4">
                <p className="text-xs font-medium uppercase text-muted-foreground">{category || 'Uncategorized'}</p>
                <h3 className="mt-1 text-base font-semibold">{name}</h3>
                <div className="mt-3">
                    <p className="text-xl font-bold">${price.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{stock > 0 ? `${stock} in stock` : 'Out of stock'}</p>
                    <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="secondary" className="flex-1" onClick={() => onAddToCart(id)} disabled={stock <= 0}>
                            Add to Cart
                        </Button>
                        <Button size="sm" className="flex-1" onClick={() => onBuyNow(id)} disabled={stock <= 0}>
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
