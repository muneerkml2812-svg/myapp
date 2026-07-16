import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'up' | 'down';
    icon: LucideIcon;
}

export function StatsCard({ title, value, change, changeType, icon: Icon }: StatsCardProps) {
    return (
        <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <Icon className="size-5 text-muted-foreground" />
            </div>
            <div className="mt-2">
                <p className="text-3xl font-bold">{value}</p>
                <p
                    className={cn(
                        'mt-1 text-xs font-medium',
                        changeType === 'up' ? 'text-emerald-600' : 'text-red-600',
                    )}
                >
                    {changeType === 'up' ? '+' : ''}{change} from last month
                </p>
            </div>
        </div>
    );
}
