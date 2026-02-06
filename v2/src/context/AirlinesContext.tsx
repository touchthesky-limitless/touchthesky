import { createContext, useContext } from "react";
import type { AirlinesContextType } from "../types/context";

export const AirlinesContext = createContext<AirlinesContextType | undefined>(undefined);

export const useAirlines = () => {
    const context = useContext(AirlinesContext);
    if (!context) {
        throw new Error("useAirlines must be used within an AirlinesProvider");
    }
    return context;
};