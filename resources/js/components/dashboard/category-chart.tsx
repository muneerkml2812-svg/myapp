import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { PieLabelRenderProps } from 'recharts';

const data = [
    { name: 'Smartphones', value: 38500, color: '#6366f1' },
    { name: 'Laptops', value: 52300, color: '#8b5cf6' },
    { name: 'Headphones', value: 15800, color: '#a78bfa' },
    { name: 'Tablets', value: 22100, color: '#c4b5fd' },
    { name: 'Watches', value: 18200, color: '#ddd6fe' },
];

const RADIAN = Math.PI / 180;

function renderCustomLabel({
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    percent = 0,
}: PieLabelRenderProps) {
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;

    const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
    const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            fontWeight={600}
        >
            {(Number(percent) * 100).toFixed(0)}%
        </text>
    );
}

export function CategoryChart() {
    return (
        <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
            <h3 className="text-lg font-semibold">Revenue by Category</h3>
            <p className="text-sm text-muted-foreground">Product category distribution</p>

            <div className="mt-4 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomLabel}
                            outerRadius={100}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>

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
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
                {data.map((entry) => (
                    <div
                        key={entry.name}
                        className="flex items-center gap-1.5 text-xs"
                    >
                        <span
                            className="size-2.5 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-muted-foreground">
                            {entry.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}