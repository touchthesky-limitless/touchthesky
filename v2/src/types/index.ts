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
	bookable: string;
	featured?: boolean;
	logo?: string;
	partners: Partner[];
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
