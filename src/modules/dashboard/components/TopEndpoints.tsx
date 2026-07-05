import { topEndpoints } from '../data/dashboard-data';

const methodColor: Record<string, string> = {
  GET: 'text-[var(--get)]',
  POST: 'text-[var(--green)]',
  PATCH: 'text-[var(--amber)]',
  DELETE: 'text-[var(--red)]',
};

export function TopEndpoints() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-card-foreground">Top endpoints</h2>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">by volume</span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="pb-2 pr-4 font-medium">Endpoint</th>
              <th scope="col" className="pb-2 pr-4 text-right font-medium">Requests</th>
              <th scope="col" className="pb-2 pr-4 text-right font-medium">P95</th>
              <th scope="col" className="pb-2 text-right font-medium">Err %</th>
            </tr>
          </thead>
          <tbody>
            {topEndpoints.map((row) => (
              <tr key={`${row.method}-${row.path}`} className="border-b border-border/60 last:border-0 hover:bg-secondary/60">
                <td className="py-2.5 pr-4">
                  <span className={`mr-2 font-mono text-xs font-semibold ${methodColor[row.method]}`}>{row.method}</span>
                  <span className="font-mono text-xs text-card-foreground">{row.path}</span>
                </td>
                <td className="py-2.5 pr-4 text-right font-mono text-xs text-card-foreground">{row.requests}</td>
                <td className="py-2.5 pr-4 text-right font-mono text-xs text-card-foreground">{row.p95}</td>
                <td
                  className={`py-2.5 text-right font-mono text-xs ${
                    row.errorRate >= 1 ? 'text-[var(--red)]' : row.errorRate >= 0.3 ? 'text-[var(--amber)]' : 'text-muted-foreground'
                  }`}
                >
                  {row.errorRate.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
