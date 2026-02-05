import React, { useState, useEffect, useMemo } from "react";
import type { Airline, Bank } from "../types";
import type {
	AirlinesContextType,
	BeforeInstallPromptEvent,
} from "../types/context";
import { AIRLINES } from "../data/partners";
import { BANKS } from "../data/banks";
import { AirlinesContext } from "./AirlinesContext"; // Import context here

export function AirlinesProvider({ children }: { children: React.ReactNode }) {
	// 1. Data State
	const [data] = useState<Airline[]>(AIRLINES);
	const [banks] = useState<Bank[]>(BANKS);
	const [loading] = useState(false);

	// 2. Filter State
	const [search, setSearch] = useState("");
	const [activeBanks, setActiveBanks] = useState<string[]>([]);
	const [activeAlliances, setActiveAlliances] = useState<string[]>([]);
	const [showOnlyBonuses, setShowOnlyBonuses] = useState(false);

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
					!showOnlyBonuses || airline.partners.some((p) => (p.bonus ?? 0) > 0);

				return matchesAlliance && matchesBank && matchesBonus;
			})
			.sort((a, b) => {
				if (a.featured && !b.featured) return -1;
				if (!a.featured && b.featured) return 1;
				return a.name.localeCompare(b.name);
			});
	}, [data, search, activeBanks, activeAlliances, showOnlyBonuses]);

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
			featuredCount: filteredData.filter((a) => a.featured).length,
			allianceCount: new Set(filteredData.map((a) => a.alliance)).size,
			bonusCount: data.filter((a) => a.partners.some((p) => (p.bonus ?? 0) > 0))
				.length,
		};
	}, [data, filteredData]);

	// 8. Context Value
	const value: AirlinesContextType = {
		banks,
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
