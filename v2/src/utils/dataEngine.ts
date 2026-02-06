import type { Airline } from "../types";

/**
 * ⚙️ SKY_INDEX DATA ENGINE v2.0
 * Processes 1,000+ nodes in a single iteration for maximum performance.
 */

export interface NetworkStats {
	regions: Record<string, number>;
	tierCounts: Record<string, number>;
	avgPopularity: number;
	totalNodes: number;
}

export const processNetworkData = (data: Airline[]): NetworkStats => {
	const stats: NetworkStats = {
		regions: {},
		tierCounts: { "Tier 1": 0, "Tier 2": 0, "Tier 3": 0 },
		avgPopularity: 0,
		totalNodes: data.length,
	};

	let totalPopScore = 0;
	let popCount = 0;

	data.forEach((item) => {
		// 1. Map Regions
		const reg = item.region || "NA";
		stats.regions[reg] = (stats.regions[reg] || 0) + 1;

		// 2. Map Tiers 📍
		if (item.tier && item.tier in stats.tierCounts) {
			stats.tierCounts[item.tier]++;
		}

		// 3. Accumulate Popularity for Average
		if (typeof item.popularity === "number") {
			totalPopScore += item.popularity;
			popCount++;
		}
	});

	// Finalize Averages
	stats.avgPopularity = popCount > 0 ? Math.round(totalPopScore / popCount) : 0;

	return stats;
};

/**
 * 🎚️ POINT POWER CALCULATOR ENGINE
 * Calculates which of the 1,000 items are "Affordable" based on user points.
 */
export const getAffordablePartners = (
	data: Airline[],
	userPoints: number,
): Airline[] => {
	return data.filter((airline) => {
		// 📍 Smart Cost Logic: Fallback if minPoints is missing in data
		const estimatedCost =
			airline.minPoints ||
			(airline.tier === "Tier 1"
				? 75000
				: airline.region === "AS"
					? 60000
					: 35000);

		return userPoints >= estimatedCost;
	});
};

/**
 * 🛡️ DATA VALIDATOR
 * Ensures your 1,000 items conform to the Sky_Index standard.
 */
export const validatePartnerData = (item: Airline): boolean => {
	return !!(item.name && item.iata && item.region);
};
