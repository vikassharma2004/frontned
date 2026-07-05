import { TrendingDown, TrendingUp } from 'lucide-react';
import { statCards } from '../data/dashboard-data';

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg border border-border bg-card p-4"
        >
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {card.label}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-card-foreground">{card.value}</span>
            <span
              className={`flex items-center gap-1 font-mono text-xs ${
                card.deltaPositive ? 'text-[var(--green)]' : 'text-[var(--amber)]'
              }`}
            >
              {card.deltaPositive ? (
                <TrendingUp className="size-3" aria-hidden="true" />
              ) : (
                <TrendingDown className="size-3" aria-hidden="true" />
              )}
              {card.delta}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{card.hint}</p>
        </div>
      ))}
    </div>
  );
}
