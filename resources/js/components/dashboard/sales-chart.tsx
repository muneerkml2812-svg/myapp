import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const data = [
    { month: 'Jan', revenue: 4200, orders: 84 },
    { month: 'Feb', revenue: 5800, orders: 112 },
    { month: 'Mar', revenue: 4900, orders: 96 },
    { month: 'Apr', revenue: 7300, orders: 148 },
    { month: 'May', revenue: 6100, orders: 124 },
    { month: 'Jun', revenue: 8400, orders: 168 },
    { month: 'Jul', revenue: 7800, orders: 156 },
    { month: 'Aug', revenue: 9200, orders: 184 },
    { month: 'Sep', revenue: 8100, orders: 162 },
    { month: 'Oct', revenue: 10500, orders: 210 },
    { month: 'Nov', revenue: 11200, orders: 224 },
    { month: 'Dec', revenue: 12800, orders: 256 },
];

export function SalesChart() {
    return (
        <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
            <h3 className="text-lg font-semibold">Sales Overview</h3>
            <p className="text-sm text-muted-foreground">
                Monthly revenue trend
            </p>

            <div className="mt-4 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="colorRevenue"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#6366f1"
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#6366f1"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-muted"
                        />

                        <XAxis
                            dataKey="month"
                            className="text-xs"
                            tick={{ fontSize: 12 }}
                        />

                        <YAxis
                            className="text-xs"
                            tick={{ fontSize: 12 }}
                            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--popover))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                                fontSize: '12px',
                            }}
                            formatter={(value) => [
                                `$${Number(value ?? 0).toLocaleString()}`,
                                'Revenue',
                            ]}
                        />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#6366f1"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}