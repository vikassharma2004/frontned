import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { statusCodes } from '../data/dashboard-data';

const chartConfig = {
  '2xx': { label: '2xx', color: 'var(--chart-1)' },
  '4xx': { label: '4xx', color: 'var(--chart-3)' },
  '5xx': { label: '5xx', color: 'var(--chart-5)' },
} satisfies ChartConfig;

function formatCount(value: number) {
  return value >= 1000 ? `${Math.round(value / 1000)}k` : `${value}`;
}

export function StatusCodesChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-card-foreground">Status codes</h2>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">last 24h</span>
      </div>
      <ChartContainer config={chartConfig} className="mt-4 h-[240px] w-full">
        <BarChart data={statusCodes} margin={{ left: 0, right: 8, top: 4 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
          <YAxis tickLine={false} axisLine={false} tickMargin={4} fontSize={11} tickFormatter={formatCount} width={40} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="2xx" stackId="a" fill="var(--color-2xx)" radius={[0, 0, 0, 0]} />
          <Bar dataKey="4xx" stackId="a" fill="var(--color-4xx)" radius={[0, 0, 0, 0]} />
          <Bar dataKey="5xx" stackId="a" fill="var(--color-5xx)" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
