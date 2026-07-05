import { recentIncidents, services } from '../data/dashboard-data';

const statusDot: Record<string, string> = {
  operational: 'bg-[var(--green)]',
  degraded: 'bg-[var(--amber)]',
  down: 'bg-[var(--red)]',
};

const severityColor: Record<string, string> = {
  critical: 'text-[var(--red)] bg-[var(--red-bg)]',
  warning: 'text-[var(--amber)] bg-[var(--amber-bg)]',
  info: 'text-[var(--blue)] bg-[var(--blue-bg)]',
};

export function ServiceHealth() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-card-foreground">Service health</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {services.map((service) => (
            <li key={service.name} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`size-2 shrink-0 rounded-full ${statusDot[service.status]} ${service.status !== 'operational' ? 'pulse-dot' : ''}`}
                  aria-hidden="true"
                />
                <span className="truncate font-mono text-xs text-card-foreground">{service.name}</span>
                <span className="sr-only">{service.status}</span>
              </div>
              <div className="flex shrink-0 items-center gap-4 font-mono text-xs text-muted-foreground">
                <span>{service.uptime}</span>
                <span className="w-12 text-right">{service.latency}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-card-foreground">Recent activity</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {recentIncidents.map((incident) => (
            <li key={incident.title} className="flex items-start gap-3">
              <span
                className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase ${severityColor[incident.severity]}`}
              >
                {incident.severity}
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-card-foreground">{incident.title}</p>
                <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                  {incident.service} · {incident.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
