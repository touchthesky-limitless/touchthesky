import { motion, useDragControls } from "framer-motion";
import type { ReactNode } from "react";

interface MobileDrawerProps {
	onClose: () => void;
	children: ReactNode;
}

export default function MobileDrawer({ onClose, children }: MobileDrawerProps) {
	const dragControls = useDragControls();

	return (
		<motion.div
			initial={{ y: "100%" }}
			animate={{ y: 0 }}
			exit={{
				y: "100%",
				transition: {
					type: "tween",
					ease: "easeInOut",
					duration: 0.3,
				},
			}}
			transition={{
				type: "spring",
				damping: 25,
				stiffness: 400,
				mass: 0.5,
				velocity: 2,
			}}
			drag="y"
			dragConstraints={{ top: 0, bottom: 0 }}
			dragElastic={{ top: 0, bottom: 0.5 }}
			dragListener={false}
			dragControls={dragControls}
			onDragEnd={(_, info) => {
				const shouldClose = info.offset.y > 100 || info.velocity.y > 500;
				if (shouldClose) {
					onClose();
				}
			}}
			// Using your legalized z-100
			className="fixed bottom-0 left-0 right-0 z-100 bg-white dark:bg-slate-950 rounded-t-[3rem] h-[85vh] overflow-hidden shadow-2xl border-t border-slate-200 dark:border-white/10"
		>
			{/* 🟢 DRAG HANDLE: Sticky at the top */}
			<div
				onPointerDown={(e) => dragControls.start(e)}
				className="sticky top-0 bg-inherit pt-5 pb-4 z-30 cursor-pointer touch-none"
			>
				<div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-800 rounded-full mx-auto" />
			</div>

			{/* 🟢 SCROLLABLE CONTENT AREA */}
			<div className="h-full overflow-y-auto touch-pan-y px-6 pb-20 no-scrollbar">
				{children}
			</div>
		</motion.div>
	);
}
