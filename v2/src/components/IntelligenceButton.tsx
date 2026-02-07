import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface IntelligenceButtonProps {
  onClick: () => void;
  variant?: "glass" | "solid";
  label?: ReactNode;
  mobileLabel?: ReactNode;
  icon?: ReactNode;
  showIcon?: boolean;
  ringColor?: string;
}

export default function IntelligenceButton({
  onClick,
  variant = "glass",
  label = "Network Intelligence",
  mobileLabel = "",
  icon = "→",
  showIcon = true,
  ringColor = "#2563eb", 
}: IntelligenceButtonProps) {
    
  const variantStyles = {
    glass: "bg-blue-50/10 dark:bg-slate-950/50 backdrop-blur-md border-blue-600/20 text-blue-700 dark:text-blue-300",
    solid: "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-blue-100 shadow-sm"
  };

  return (
    <button
      onClick={onClick}
      className="cursor-pointer group relative flex items-center justify-center p-[1px] rounded-full transition-all duration-300 active:scale-95 shrink-0 overflow-hidden"
    >
      {/* 🟢 THE RING: Increased contrast for Glass variant */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          style={{ 
            background: `conic-gradient(from 0deg, transparent 0deg, transparent 280deg, ${ringColor} 360deg)` 
          }}
          className="absolute inset-[-150%] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      {/* 🟢 INNER CONTENT: The 'backdrop-blur' helps separate the text from the ring animation */}
      <div className={`relative z-10 w-full h-full flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 ${variantStyles[variant]}`}>
        
        {/* Shimmer Effect */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-0 w-1/2 skew-x-12 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        {/* Status Indicator */}
        <span className="relative flex h-2 w-2">
          <span 
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: ringColor }}
          ></span>
          <span 
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: ringColor }}
          ></span>
        </span>

        <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.1em] group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
          <span className="inline sm:hidden">{mobileLabel}</span>
          <span className="hidden sm:inline">{label}</span>
        </span>

        {showIcon && (
          <motion.span
            variants={{ initial: { x: 0 }, hover: { x: 5 } }}
            initial="initial"
            whileHover="hover"
            className="relative z-10 text-sm group-hover:text-blue-600 dark:group-hover:text-white transition-colors"
          >
            {icon}
          </motion.span>
        )}
      </div>
    </button>
  );
}