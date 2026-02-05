import { useState } from "react";

/**
 * 🛠️ Helper to parse input strings and ratio strings
 */
const parseCalcInputs = (valStr: string, ratioStr: string) => {
    const num = Number(valStr.replace(/,/g, "")) || 0;
    const [from, to] = ratioStr.split(":").map(Number);
    return { num, from, to };
};

export const usePointCalculator = () => {
    const [pointsAmount, setPointsAmount] = useState<string>("1,000");
    const [calcMode, setCalcMode] = useState<"have" | "need">("have");

    /**
     * 🟢 I Have: (Points / From) * To + Bonus
     */
    const calculateTransfer = (ratioStr: string, bonus: number = 0) => {
        if (!ratioStr) return 0;
        const { num, from, to } = parseCalcInputs(pointsAmount, ratioStr);
        if (!num) return 0;
        const base = (num / from) * to;
        return Math.floor(base * (1 + bonus / 100));
    };

    /**
     * 🔴 I Need: (Goal / (To/From)) / (1 + Bonus)
     */
    const calculateRequired = (ratioStr: string, bonus: number = 0) => {
        if (!ratioStr) return 0;
        const { num: goal, from, to } = parseCalcInputs(pointsAmount, ratioStr);
        if (!goal) return 0;
        const totalRequired = goal / ((to / from) * (1 + bonus / 100));
        return Math.ceil(totalRequired);
    };

    /**
     * 🔢 Formats the input with thousand separators
     */
    const handleInputChange = (rawVal: string) => {
        const val = rawVal.replace(/,/g, "");
        if (!isNaN(Number(val))) {
            setPointsAmount(Number(val).toLocaleString());
        }
    };

    return {
        pointsAmount,
        setPointsAmount: handleInputChange, // 🪄 Automatically handles 1,000 formatting
        calcMode,
        setCalcMode,
        calculateTransfer,
        calculateRequired
    };
};