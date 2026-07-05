/**
 * Dashboard demo data — module-level constants so they are computed once,
 * never re-created on render, and trivially swappable for a real API
 * (wrap in a TanStack Query hook with queryKey ['dashboard-overview']).
 */

export interface StatCard {
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  hint: string;
}

export const statCards: StatCard[] = [
  { label: 'Total Requests', value: '2.4M', delta: '+12.3%', deltaPositive: true, hint: 'vs previous 24h' },
  { label: 'Error Rate', value: '0.42%', delta: '-0.08%', deltaPositive: true, hint: 'vs previous 24h' },
  { label: 'P95 Latency', value: '182ms', delta: '+14ms', deltaPositive: false, hint: 'vs previous 24h' },
  { label: 'Active Services', value: '18/19', delta: '1 degraded', deltaPositive: false, hint: 'checks passing' },
];

export interface RequestPoint {
  time: string;
  success: number;
  errors: number;
}

export const requestVolume: RequestPoint[] = [
  { time: '00:00', success: 68200, errors: 320 },
  { time: '02:00', success: 52400, errors: 210 },
  { time: '04:00', success: 44100, errors: 180 },
  { time: '06:00', success: 61800, errors: 260 },
  { time: '08:00', success: 98400, errors: 540 },
  { time: '10:00', success: 132600, errors: 720 },
  { time: '12:00', success: 141200, errors: 690 },
  { time: '14:00', success: 137800, errors: 1240 },
  { time: '16:00', success: 129500, errors: 860 },
  { time: '18:00', success: 118300, errors: 470 },
  { time: '20:00', success: 96700, errors: 380 },
  { time: '22:00', success: 78900, errors: 290 },
];

export interface LatencyPoint {
  time: string;
  p50: number;
  p95: number;
  p99: number;
}

export const latencySeries: LatencyPoint[] = [
  { time: '00:00', p50: 42, p95: 138, p99: 290 },
  { time: '02:00', p50: 38, p95: 121, p99: 260 },
  { time: '04:00', p50: 36, p95: 115, p99: 244 },
  { time: '06:00', p50: 41, p95: 132, p99: 276 },
  { time: '08:00', p50: 52, p95: 168, p99: 348 },
  { time: '10:00', p50: 61, p95: 194, p99: 412 },
  { time: '12:00', p50: 63, p95: 201, p99: 431 },
  { time: '14:00', p50: 71, p95: 246, p99: 528 },
  { time: '16:00', p50: 58, p95: 188, p99: 391 },
  { time: '18:00', p50: 49, p95: 161, p99: 334 },
  { time: '20:00', p50: 45, p95: 149, p99: 305 },
  { time: '22:00', p50: 43, p95: 141, p99: 296 },
];

export interface StatusCodePoint {
  time: string;
  '2xx': number;
  '4xx': number;
  '5xx': number;
}

export const statusCodes: StatusCodePoint[] = [
  { time: '00:00', '2xx': 67400, '4xx': 620, '5xx': 180 },
  { time: '04:00', '2xx': 43600, '4xx': 410, '5xx': 90 },
  { time: '08:00', '2xx': 97200, '4xx': 980, '5xx': 240 },
  { time: '12:00', '2xx': 139800, '4xx': 1120, '5xx': 280 },
  { time: '16:00', '2xx': 128100, '4xx': 1310, '5xx': 460 },
  { time: '20:00', '2xx': 95600, '4xx': 840, '5xx': 210 },
];

export interface EndpointRow {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  requests: string;
  p95: string;
  errorRate: number;
}

export const topEndpoints: EndpointRow[] = [
  { method: 'GET', path: '/api/v1/events', requests: '812K', p95: '96ms', errorRate: 0.12 },
  { method: 'POST', path: '/api/v1/ingest', requests: '644K', p95: '211ms', errorRate: 0.31 },
  { method: 'GET', path: '/api/v1/projects/:id/metrics', requests: '389K', p95: '148ms', errorRate: 0.09 },
  { method: 'GET', path: '/api/v1/traces/:id', requests: '271K', p95: '176ms', errorRate: 0.44 },
  { method: 'POST', path: '/auth/sessions/refresh', requests: '184K', p95: '64ms', errorRate: 0.02 },
  { method: 'PATCH', path: '/api/v1/alerts/rules/:id', requests: '42K', p95: '132ms', errorRate: 1.87 },
];

export interface ServiceRow {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: string;
  latency: string;
}

export const services: ServiceRow[] = [
  { name: 'ingest-gateway', status: 'operational', uptime: '99.99%', latency: '38ms' },
  { name: 'query-engine', status: 'operational', uptime: '99.97%', latency: '84ms' },
  { name: 'alert-dispatcher', status: 'degraded', uptime: '98.41%', latency: '412ms' },
  { name: 'auth-service', status: 'operational', uptime: '100%', latency: '22ms' },
  { name: 'trace-collector', status: 'operational', uptime: '99.95%', latency: '61ms' },
];

export interface IncidentRow {
  title: string;
  service: string;
  severity: 'critical' | 'warning' | 'info';
  time: string;
}

export const recentIncidents: IncidentRow[] = [
  { title: 'Elevated 5xx on alert-dispatcher', service: 'alert-dispatcher', severity: 'critical', time: '14:22' },
  { title: 'P99 latency spike on /api/v1/ingest', service: 'ingest-gateway', severity: 'warning', time: '14:05' },
  { title: 'Deploy v2.41.0 rolled out', service: 'query-engine', severity: 'info', time: '11:30' },
  { title: 'Rate limit threshold reached (org acme)', service: 'ingest-gateway', severity: 'warning', time: '09:47' },
];
