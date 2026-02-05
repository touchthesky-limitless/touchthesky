/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

export default function IOSTipBanner() {
	const [showTip, setShowTip] = useState(false);
	const [isIOS, setIsIOS] = useState(false);
	const [isStandalone, setIsStandalone] = useState(false);

	useEffect(() => {
		// Detect iOS
		const isIOSDevice =
			/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setIsIOS(isIOSDevice);

		// Detect if already installed
		const isPWA =
			window.matchMedia("(display-mode: standalone)").matches ||
			(navigator as any).standalone;
		setIsStandalone(isPWA);

		// Check localStorage
		const isDismissed = localStorage.getItem("ios-tip-dismissed");

		if (isIOSDevice && !isPWA && !isDismissed) {
			setShowTip(true);
		}
	}, []);

	const handleDismissTip = () => {
		setShowTip(false);
		try {
			localStorage.setItem("ios-tip-dismissed", "true");
		} catch (e) {
			// Fallback for private browsing mode where localStorage might be blocked
			console.error("Could not save to localStorage", e);
		}
	};

	if (!showTip || !isIOS || isStandalone) return null;

	return (
		<div className="max-w-7xl mx-auto pt-4 px-4">
			<div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
				<div className="flex items-center gap-3">
					<div className="text-2xl drop-shadow-sm">📲</div>
					<p className="text-[11px] text-blue-800 dark:text-blue-200 leading-tight">
						<span className="font-bold">Install on iPhone:</span> Tap the
						<span className="mx-1 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-700 font-medium inline-flex items-center">
							share icon
						</span>
						and select <span className="font-bold">"Add to Home Screen"</span>.
					</p>
				</div>

				<button
					onClick={handleDismissTip}
					className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-800/50 rounded-full transition-colors flex-shrink-0"
					aria-label="Dismiss tip"
				>
					<svg
						className="w-4 h-4 text-blue-500/70"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2.5}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
