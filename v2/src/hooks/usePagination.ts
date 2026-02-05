import { useState } from "react";

export function usePagination<T>(data: T[], initialCount: number = 10) {
	const [visibleCount, setVisibleCount] = useState(initialCount);

	const showMore = () => setVisibleCount((prev) => prev + initialCount);
	const showAll = () => setVisibleCount(data.length);
	const reset = () => setVisibleCount(initialCount); // This resets the count

	return {
		paginatedData: data.slice(0, visibleCount),
		hasMore: visibleCount < data.length,
		remaining: data.length - visibleCount,
		showMore,
		showAll,
		reset,
	};
}
