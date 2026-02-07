interface SliderProps {
  points: number;
  setPoints: (val: number) => void;
}

export default function PointPowerSlider({ points, setPoints }: SliderProps) {
  return (
    <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-inner">
      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] mb-1">
            Point Power
          </p>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic">
            {points >= 1000 ? points.toLocaleString() : points}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Capacity
          </p>
          <p className="text-sm font-black text-slate-900 dark:text-white uppercase">
            {points > 150000 ? "First Class" : "Economy+"}
          </p>
        </div>
      </div>

      <div className="relative flex items-center group">
        {/* Custom Track Background */}
        <div className="absolute w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full" />
        
        {/* Active "Glow" Track */}
        <div 
          className="absolute h-2 bg-sky-500 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all duration-300"
          style={{ width: `${(points / 250000) * 100}%` }}
        />

        <input
          type="range"
          min="0"
          max="250000"
          step="5000"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          className="relative w-full h-8 bg-transparent appearance-none cursor-pointer accent-white outline-none z-10 
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:w-6 
          [&::-webkit-slider-thumb]:h-6 
          [&::-webkit-slider-thumb]:bg-white 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:shadow-xl 
          [&::-webkit-slider-thumb]:border-4 
          [&::-webkit-slider-thumb]:border-sky-500
          [&::-webkit-slider-thumb]:active:scale-90
          [&::-webkit-slider-thumb]:transition-transform"
        />
      </div>

      <div className="flex justify-between mt-4">
        <span className="text-[8px] font-black text-slate-400 uppercase">0 pts</span>
        <span className="text-[8px] font-black text-slate-400 uppercase">250,000 pts</span>
      </div>
    </div>
  );
}