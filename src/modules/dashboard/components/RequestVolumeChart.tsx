import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { requestVolume } from '../data/dashboard-data';

const chartConfig = {
  success: { label: 'Success', color: 'var(--chart-1)' },
  errors: { label: 'Errors', color: 'var(--chart-5)' },
} satisfies ChartConfig;

function formatCount(value: number) {
  return value >= 1000 ? `${Math.round(value / 1000)}k` : `${value}`;
}

export function RequestVolumeChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-card-foreground">Request volume</h2>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">last 24h</span>
      </div>
      <ChartContainer config={chartConfig} className="mt-4 h-[260px] w-full">
        <AreaChart data={requestVolume} margin={{ left: 0, right: 8, top: 4 }}>
          <defs>
            <linearGradient id="fillSuccess" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="fillErrors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-errors)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-errors)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
          <YAxis tickLine={false} axisLine={false} tickMargin={4} fontSize={11} tickFormatter={formatCount} width={40} />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Area dataKey="success" type="monotone" fill="url(#fillSuccess)" stroke="var(--color-success)" strokeWidth={1.5} />
          <Area dataKey="errors" type="monotone" fill="url(#fillErrors)" stroke="var(--color-errors)" strokeWidth={1.5} />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
