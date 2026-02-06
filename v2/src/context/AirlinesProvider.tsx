import React, { useState, useEffect, useMemo } from "react";
import type { Airline, Bank } from "../types";
import type {
	AirlinesContextType,
	BeforeInstallPromptEvent,
} from "../types/context";
import { AIRLINES } from "../data/partners";
import { BANKS } from "../data/banks";
import { AirlinesContext } from "./AirlinesContext";

export function AirlinesProvider({ children }: { children: React.ReactNode }) {
	// 1. Data State
	const [data] = useState<Airline[]>(AIRLINES);
	const [banks] = useState<Bank[]>(BANKS);
	const [loading] = useState(false);

	/* 🟢 1.5 Optimized Bank Color Lookup Map */
	/* This converts the BANKS array into a key-value object once on mount. */

	const bankColorMap = useMemo(() => {
		return BANKS.reduce(
			(acc, bank) => {
				const hex = bank.bg.match(/\[(.*?)\]/)?.[1] || "#ef4444";
				// 🟢 Convert #117aca to "17, 122, 202"
				const r = parseInt(hex.slice(1, 3), 16);
				const g = parseInt(hex.slice(3, 5), 16);
				const b = parseInt(hex.slice(5, 7), 16);
				acc[bank.id] = `${r} ${g} ${b}`;
				return acc;
			},
			{} as Record<string, string>,
		);
	}, []);

	// 2. Filter State
	const [search, setSearch] = useState("");
	const [activeBanks, setActiveBanks] = useState<string[]>([]);
	const [activeAlliances, setActiveAlliances] = useState<string[]>([]);
	const [showOnlyBonuses, setShowOnlyBonuses] = useState(false);
	const [showOnlyFeatured, setShowOnlyFeatured] = useState<boolean>(false);

	// 3. Theme Logic
	const [isDark, setIsDark] = useState(() => {
		return (
			localStorage.getItem("theme") === "dark" ||
			(!localStorage.getItem("theme") &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		);
	});

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDark]);

	// 4. PWA Install Logic
	const [installPrompt, setInstallPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);

	useEffect(() => {
		const handler = (e: Event) => {
			e.preventDefault();
			setInstallPrompt(e as BeforeInstallPromptEvent);
		};
		window.addEventListener("beforeinstallprompt", handler);
		return () => window.removeEventListener("beforeinstallprompt", handler);
	}, []);

	const handleInstallClick = async () => {
		if (!installPrompt) return;
		installPrompt.prompt();
		const { outcome } = await installPrompt.userChoice;
		if (outcome === "accepted") setInstallPrompt(null);
	};

	// 5. The "Brain" - Filtering & Sorting Logic
	const filteredData = useMemo(() => {
		const searchTerm = search.toLowerCase().trim();

		return data
			.filter((airline) => {
				const matchesSearch =
					searchTerm === "" ||
					airline.name?.toLowerCase().includes(searchTerm) ||
					airline.iata?.toLowerCase().includes(searchTerm) ||
					airline.alliance?.toLowerCase().includes(searchTerm);

				if (!matchesSearch) return false;

				const category = [
					"Star Alliance",
					"SkyTeam",
					"Oneworld",
					"Hotels",
				].includes(airline.alliance)
					? airline.alliance
					: "No Alliance";

				const matchesAlliance =
					activeAlliances.length === 0 || activeAlliances.includes(category);

				const matchesBank =
					activeBanks.length === 0 ||
					airline.partners.some((p) => activeBanks.includes(p.bank));

				const matchesBonus =
					!showOnlyBonuses ||
					airline.partners.some((p) => (p.bonusAmount ?? 0) > 0);

				// 🟢 Add check for the Featured toggle
				const matchesFeatured = 
					!showOnlyFeatured || airline.featured;

				return matchesAlliance && matchesBank && matchesBonus && matchesFeatured;
			})
			.sort((a, b) => {
				// 🟢 1. Priority: Bonus (Green Cards)
				const aHasBonus = a.partners.some((p) => (p.bonusAmount ?? 0) > 0);
				const bHasBonus = b.partners.some((p) => (p.bonusAmount ?? 0) > 0);
				
				if (aHasBonus && !bHasBonus) return -1;
				if (!aHasBonus && bHasBonus) return 1;

				// 🟢 2. Priority: Featured (Blue Cards)
				// if (a.featured && !b.featured) return -1;
				// if (!a.featured && b.featured) return 1;

				// 🟢 3. Priority: Only Bonus cards (Green) stay on top
				if (aHasBonus && !bHasBonus) return -1;
				if (!aHasBonus && bHasBonus) return 1;

				// 🟢 4. Priority: Alphabetical
				return a.name.localeCompare(b.name);
			});
			
		// 🟢 Added showOnlyFeatured to dependencies
	}, [data, search, activeBanks, activeAlliances, showOnlyBonuses, showOnlyFeatured]);

	// 6. Global Helper Actions
	const toggleBank = (bankId: string) => {
		setActiveBanks((prev) =>
			prev.includes(bankId)
				? prev.filter((id) => id !== bankId)
				: [...prev, bankId],
		);
	};

	const toggleAlliance = (name: string) => {
		setActiveAlliances((prev) =>
			prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name],
		);
	};

	const getPartnerCount = (bankCode: string) => {
		return data.filter((airline) =>
			airline.partners.some(
				(p) => p.bank.toLowerCase() === bankCode.toLowerCase(),
			),
		).length;
	};

	const resetFilters = () => {
		setSearch("");
		setActiveBanks([]);
		setActiveAlliances([]);
		setShowOnlyBonuses(false);
	};

	// 7. Analytics for StatsBar
	const analytics = useMemo(() => {
		return {
			totalAirlines: data.length,
			filteredCount: filteredData.length,
			// 🟢 Featured airlines within the current search/filter
			featuredCount: filteredData.filter((a) => a.featured).length,

			allianceCount: new Set(filteredData.map((a) => a.alliance)).size,

			// 🟢 Update this to filteredData so the "Bonuses" count
			// matches what the user actually sees on screen
			bonusCount: filteredData.filter((a) =>
				a.partners.some((p) => (p.bonusAmount ?? 0) > 0),
			).length,
		};
	}, [data, filteredData]);

	// 8. Context Value
	const value: AirlinesContextType = {
		banks,
		bankColorMap,
		loading,
		filteredData,
		search,
		setSearch,
		activeBanks,
		setActiveBanks,
		activeAlliances,
		setActiveAlliances,
		showOnlyBonuses,
		setShowOnlyBonuses,
		showOnlyFeatured,
		setShowOnlyFeatured,
		isDark,
		setIsDark,
		installPrompt,
		handleInstallClick,
		toggleBank,
		toggleAlliance,
		getPartnerCount,
		resetFilters,
		...analytics,
	};

	return (
		<AirlinesContext.Provider value={value}>
			{children}
		</AirlinesContext.Provider>
	);
}
