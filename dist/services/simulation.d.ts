import { SimulationService, SimulationConfig, SimulationResult, TrafficPatternService } from '../interfaces/types.js';
export declare class LocalSimulationService implements SimulationService {
    private trafficService;
    constructor(trafficService?: TrafficPatternService);
    /** Simple seeded PRNG (mulberry32). Returns a function that produces values in [0, 1). */
    private createRng;
    run(config: SimulationConfig): Promise<SimulationResult>;
    private calculateSummary;
}
