import { cn } from '@/lib/utils';

interface CategoryTabsProps {
    selected: string;
    onSelect: (category: string) => void;
    categories: Array<{ id: number; name: string }>;
}

export function CategoryTabs({ selected, onSelect, categories }: CategoryTabsProps) {
    const tabs = [{ id: 0, name: 'All' }, ...categories];

    return (
        <div className="flex flex-wrap gap-2">
            {tabs.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelect(category.name)}
                    className={cn(
                        'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                        selected === category.name
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-white text-muted-foreground hover:bg-neutral-100 dark:bg-sidebar dark:hover:bg-neutral-800',
                    )}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}
