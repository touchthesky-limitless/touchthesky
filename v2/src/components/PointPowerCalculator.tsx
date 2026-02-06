import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AIRLINES } from "../data/partners";

export default function PointPowerCalculator() {
    const [points, setPoints] = useState(100000);

    // 🚀 Intelligence Engine
    const filtered = useMemo(() => {
        return AIRLINES.filter(a => {
            const cost = a.region === "AS" ? 80000 : 35000; 
            return points >= cost;
        }).slice(0, 12); // Showing top 12 for performance
    }, [points]);

    return (
        <div className="p-8 bg-slate-950 rounded-[3rem] border border-white/5 shadow-2xl">
            
            {/* 🎚️ iPhone Control Center Slider */}
            <div className="mb-12">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-sky-500">Wallet Capacity</h4>
                        <p className="text-5xl font-black tracking-tighter text-white mt-1">
                            ${points.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-emerald-500/10 px-4 py-2 rounded-2xl border border-emerald-500/20 text-right">
                        <p className="text-[9px] font-bold text-emerald-500 uppercase">Available</p>
                        <p className="text-xl font-black text-white">
                            {filtered.length >= 1000 ? "1,000" : filtered.length} Partners
                        </p>
                    </div>
                </div>

                <div className="relative group">
                    <input 
                        type="range" 
                        min="10000" 
                        max="250000" 
                        step="5000"
                        value={points}
                        onChange={(e) => setPoints(Number(e.target.value))}
                        className="w-full h-4 bg-slate-900 rounded-2xl appearance-none cursor-pointer accent-sky-500 outline-none border border-white/5"
                    />
                </div>
            </div>

            {/* 💫 Spring-Physics Grid Container */}
            <div className="relative min-h-[400px]">
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((airline) => (
                            <motion.div
                                key={airline.iata}
                                layout
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.15 } }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 400, 
                                    damping: 28,
                                    mass: 0.8 
                                }}
                                className="bg-white/5 border border-white/10 p-4 rounded-[2rem] flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center font-black text-white text-xs">
                                        {airline.iata}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-white">{airline.name}</p>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase">{airline.region}</p>
                                    </div>
                                </div>
                                <button className="cursor-pointer bg-white/5 hover:bg-white text-[9px] font-black text-white hover:text-black px-4 py-2 rounded-xl transition-all uppercase">
                                    Select 📍
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            <p className="mt-8 text-center text-[9px] font-bold text-slate-700 uppercase tracking-[0.2em]">
                Scanning {AIRLINES.length >= 1000 ? "1,000" : AIRLINES.length} Network Nodes
            </p>
        </div>
    );
}