// ============================================================================
// scalings.xyz — Shared Load Test Export Utilities
// ============================================================================

import {
  SimulationConfig,
  SteadyParams,
  GradualParams,
  SpikeParams,
  WaveParams,
  StepParams,
  CustomParams,
} from '../../interfaces/types.js';

/**
 * Estimate the peak RPS from a simulation config's traffic pattern.
 * Used by all load test exporters for validation and VU sizing.
 */
export function estimatePeakRps(config: SimulationConfig): number {
  const p = config.producer.traffic.params;
  switch (config.producer.traffic.pattern) {
    case 'steady': return (p as SteadyParams).rps;
    case 'gradual': return Math.max((p as GradualParams).start_rps, (p as GradualParams).end_rps);
    case 'spike': return (p as SpikeParams).spike_rps;
    case 'wave': return (p as WaveParams).base_rps + (p as WaveParams).amplitude;
    case 'step': return Math.max(...(p as StepParams).steps.map(s => s.rps), 0);
    case 'custom':
    case 'grafana': return Math.max(...((p as CustomParams).series || []).map(s => s.rps), 0);
    default: return 0;
  }
}

/**
 * Convert a target RPS to the number of concurrent virtual users (VUs/threads)
 * needed to sustain that rate, given the average response time per request.
 *
 * Formula: VUs = ceil(rps * avgResponseSec)
 * Each VU can complete 1/avgResponseSec requests per second, so to sustain
 * `rps` requests/sec you need `rps * avgResponseSec` VUs running concurrently.
 */
export function rpsToVUs(rps: number, avgResponseSec: number): number {
  return Math.max(1, Math.ceil(rps * avgResponseSec));
}
