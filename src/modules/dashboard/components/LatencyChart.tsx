import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { latencySeries } from '../data/dashboard-data';

const chartConfig = {
  p50: { label: 'p50', color: 'var(--chart-1)' },
  p95: { label: 'p95', color: 'var(--chart-2)' },
  p99: { label: 'p99', color: 'var(--chart-3)' },
} satisfies ChartConfig;

export function LatencyChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-card-foreground">Latency percentiles</h2>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">ms · last 24h</span>
      </div>
      <ChartContainer config={chartConfig} className="mt-4 h-[260px] w-full">
        <LineChart data={latencySeries} margin={{ left: 0, right: 8, top: 4 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
          <YAxis tickLine={false} axisLine={false} tickMargin={4} fontSize={11} width={40} />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line dataKey="p50" type="monotone" stroke="var(--color-p50)" strokeWidth={1.5} dot={false} />
          <Line dataKey="p95" type="monotone" stroke="var(--color-p95)" strokeWidth={1.5} dot={false} />
          <Line dataKey="p99" type="monotone" stroke="var(--color-p99)" strokeWidth={1.5} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
