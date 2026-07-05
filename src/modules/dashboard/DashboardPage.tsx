import { StatCards } from './components/StatCards';
import { RequestVolumeChart } from './components/RequestVolumeChart';
import { LatencyChart } from './components/LatencyChart';
import { StatusCodesChart } from './components/StatusCodesChart';
import { TopEndpoints } from './components/TopEndpoints';
import { ServiceHealth } from './components/ServiceHealth';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          API monitoring overview across all connected services.
        </p>
      </header>

      <StatCards />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <RequestVolumeChart />
        <LatencyChart />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-4">
          <StatusCodesChart />
          <TopEndpoints />
        </div>
        <ServiceHealth />
      </div>
    </div>
  );
}
