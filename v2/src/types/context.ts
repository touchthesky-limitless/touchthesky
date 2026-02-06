import type { Airline, Bank } from "./index";

export interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export interface AirlinesContextType {
	banks: Bank[];
	bankColorMap: Record<string, string>;
	loading: boolean;
	filteredData: Airline[];
	search: string;
	setSearch: (val: string) => void;
	activeBanks: string[];
	setActiveBanks: (banks: string[]) => void;
	activeAlliances: string[];
	setActiveAlliances: (alliances: string[]) => void;
	showOnlyBonuses: boolean;
	setShowOnlyBonuses: (val: boolean) => void;
	showOnlyFeatured: boolean;
	setShowOnlyFeatured: (val: boolean) => void;
	isDark: boolean;
	setIsDark: (val: boolean | ((prev: boolean) => boolean)) => void;
	installPrompt: BeforeInstallPromptEvent | null;
	handleInstallClick: () => Promise<void>;
	toggleBank: (bankId: string) => void;
	toggleAlliance: (name: string) => void;
	getPartnerCount: (bankCode: string) => number;
	resetFilters: () => void;
	totalAirlines: number;
	filteredCount: number;
	featuredCount: number;
	bonusCount: number;
	allianceCount: number;
}
