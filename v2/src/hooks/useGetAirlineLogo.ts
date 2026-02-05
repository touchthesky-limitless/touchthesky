import { useMemo } from "react";
import type { Airline, Bank } from "../types";

export const useGetAirlineLogos = (airline: Airline, banks: Bank[]) => {
    // 🟢 OPTIMIZED: Airline Logo Logic
    const airlineLogoUrl = useMemo(() => {
        const { logo, domain } = airline;
        if (!logo) return `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
        return logo.startsWith("http") ? logo : `/logos/${logo}`;
    }, [airline]);

    // 🟢 OPTIMIZED: Memoized Bank Map for O(1) lookups
    const bankMap = useMemo(() => {
        const map: Record<string, Bank> = {};
        banks?.forEach((b: Bank) => {
            map[b.id.toLowerCase()] = b;
        });
        return map;
    }, [banks]);

    // 🟢 OPTIMIZED: Bank Logo Lookup function
    const getBankLogo = (bankId: string) => {
        const bank = bankMap[bankId.toLowerCase()];
        if (!bank) return `https://ui-avatars.com/api/?name=${bankId}`;
        return (
            bank.logoOverride ||
            `https://www.google.com/s2/favicons?sz=64&domain=${bank.domain}`
        );
    };

    return { airlineLogoUrl, getBankLogo };
};