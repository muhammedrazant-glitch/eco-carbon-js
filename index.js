/**
 * Eco-Carbon-JS v1.0.0
 * Tracks real-time web performance and carbon footprint.
 */

const EcoTracker = {
    // Average carbon intensity of electricity (gCO2e/kWh)
    CARBON_INTENSITY: 442, 
    // Energy consumption of data transfer (kWh/GB)
    ENERGY_PER_GB: 0.06,

    init() {
        window.addEventListener('load', () => {
            this.calculateEmissions();
        });
    },

    calculateEmissions() {
        // Use Performance API to get total bytes transferred
        const resources = window.performance.getEntriesByType('resource');
        let totalBytes = 0;

        resources.forEach(resource => {
            totalBytes += resource.transferSize || 0;
        });

        const totalGB = totalBytes / (1024 * 1024 * 1024);
        const energyUsed = totalGB * this.ENERGY_PER_GB;
        const co2Emissions = energyUsed * this.CARBON_INTENSITY;

        console.log(`[Eco-Tracker] Total Data: ${(totalBytes / 1024).toFixed(2)} KB`);
        console.log(`[Eco-Tracker] Estimated CO2: ${co2Emissions.toFixed(6)} grams`);
        
        return co2Emissions;
    }
};

EcoTracker.init();
