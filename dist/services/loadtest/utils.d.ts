import { SimulationConfig } from '../../interfaces/types.js';
/**
 * Estimate the peak RPS from a simulation config's traffic pattern.
 * Used by all load test exporters for validation and VU sizing.
 */
export declare function estimatePeakRps(config: SimulationConfig): number;
/**
 * Convert a target RPS to the number of concurrent virtual users (VUs/threads)
 * needed to sustain that rate, given the average response time per request.
 *
 * Formula: VUs = ceil(rps * avgResponseSec)
 * Each VU can complete 1/avgResponseSec requests per second, so to sustain
 * `rps` requests/sec you need `rps * avgResponseSec` VUs running concurrently.
 */
export declare function rpsToVUs(rps: number, avgResponseSec: number): number;
