import { useContext } from "react";
import { AirlinesContext } from "../context/AirlinesContext";

export const useAirlines = () => {
	const context = useContext(AirlinesContext);
	if (!context) {
		throw new Error("useAirlines must be used within an AirlinesProvider");
	}
	return context;
};
