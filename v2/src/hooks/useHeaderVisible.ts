import { useState, useEffect } from "react";

export function useHeaderVisible() {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const controlHeader = () => {
			if (window.scrollY < 10) setIsVisible(true);
			else if (window.scrollY > lastScrollY) setIsVisible(false);
			else setIsVisible(true);
			setLastScrollY(window.scrollY);
		};
		window.addEventListener("scroll", controlHeader);
		return () => window.removeEventListener("scroll", controlHeader);
	}, [lastScrollY]);

	return isVisible;
}
