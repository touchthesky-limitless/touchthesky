export interface Partner {
	bank: string;
	ratio: string;
	transferTime: string;
	bonusAmount?: number;
	bonusStarts?: string;
	bonusEnds?: string;
}

export interface Airline {
	name: string;
	award: string;
	iata: string;
	domain: string;
	alliance: string;
	region: string;
	bookable: string;
	featured?: boolean;
	logo?: string;
	partners: Partner[];
	popularity?: number; // 0 to 100
    tier?: "Tier 1" | "Tier 2" | "Tier 3" | "Unranked";
	minPoints?: number;
}

export interface Bank {
	id: string;
	name: string;
	domain: string;
	bg: string;
	text: string;
	logoOverride?: string;
	from?: number;
	to?: number;
	label?: string;
}
