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
	const [currentTime, setCurrentTime] = useState(() => Date.now());

	/* 🟢 Update the time once a minute to keep expirations accurate */
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(Date.now());
		}, 60000); // Update every 60 seconds
		return () => clearInterval(timer);
	}, []);

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

		// Helper to check if a partner has a valid, non-expired bonus
		const hasValidBonus = (airline: Airline) => {
			return airline.partners.some((p) => {
				if (!p.bonusAmount || p.bonusAmount <= 0) return false;
				if (!p.bonusEnds) return true; // No end date = permanent bonus

				// Normalize date for Safari and set to end of day
				const expiry = new Date(p.bonusEnds.replace(/-/g, "/"));
				expiry.setHours(23, 59, 59, 999);
				return expiry.getTime() > currentTime;
			});
		};

		return data
			.filter((airline) => {
				// Search Logic
				const matchesSearch =
					searchTerm === "" ||
					airline.name?.toLowerCase().includes(searchTerm) ||
					airline.iata?.toLowerCase().includes(searchTerm) ||
					airline.alliance?.toLowerCase().includes(searchTerm);

				if (!matchesSearch) return false;

				// Alliance Logic
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

				// Bank Logic
				const matchesBank =
					activeBanks.length === 0 ||
					airline.partners.some((p) => activeBanks.includes(p.bank));

				// 🟢 FIXED: matchesBonus now checks both amount AND expiration
				const matchesBonus = !showOnlyBonuses || hasValidBonus(airline);

				const matchesFeatured = !showOnlyFeatured || airline.featured;

				return (
					matchesAlliance && matchesBank && matchesBonus && matchesFeatured
				);
			})
			.sort((a, b) => {
				// 🟢 FIXED: Sorting now respects expiration too
				const aHasBonus = hasValidBonus(a);
				const bHasBonus = hasValidBonus(b);

				if (aHasBonus && !bHasBonus) return -1;
				if (!aHasBonus && bHasBonus) return 1;

				// Alphabetical fallback
				return a.name.localeCompare(b.name);
			});
	}, [
		data,
		search,
		activeBanks,
		activeAlliances,
		showOnlyBonuses,
		showOnlyFeatured,
		currentTime,
	]);

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
		// Helper used here too for consistency
		const isBonusLive = (airline: Airline) =>
			airline.partners.some((p) => {
				if (!p.bonusAmount) return false;
				if (!p.bonusEnds) return true;
				const expiry = new Date(p.bonusEnds.replace(/-/g, "/"));
				expiry.setHours(23, 59, 59, 999);
				return expiry.getTime() > currentTime;
			});

		return {
			totalAirlines: data.length,
			filteredCount: filteredData.length,
			featuredCount: filteredData.filter((a) => a.featured).length,
			allianceCount: new Set(filteredData.map((a) => a.alliance)).size,

			// 🟢 FIXED: Bonus count now matches the filtered visual state
			bonusCount: filteredData.filter((a) => isBonusLive(a)).length,
		};
	}, [data, filteredData, currentTime]);

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
