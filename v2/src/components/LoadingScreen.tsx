export default function LoadingScreen() {
	return (
		<div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden fixed inset-0 z-[100]">
			{/* Sky Background Glow - Added pulse for extra "life" */}
			<div className="absolute w-64 h-64 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />

			<div className="relative flex flex-col items-center">
				{/* Airplane Icon with Takeoff Animation */}
				<div className="mb-6 text-blue-500 animate-bounce">
					<svg
						className="w-16 h-16 transform -rotate-45"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
					</svg>
				</div>

				{/* Branding */}
				<h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">
					Touch The Sky...
				</h1>

				{/* Loading Indicator */}
				<div className="flex items-center gap-2">
					<div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
					<p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] ml-1">
						Preparing for takeoff
					</p>
				</div>
			</div>
		</div>
	);
}
