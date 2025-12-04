import { useEffect } from 'react';

export function useDebounceEffect(
	effect: () => void | (() => void),
	deps: unknown[],
) {
	useEffect(() => {
		const handler = setTimeout(() => {
			effect();
		}, 200);

		// Cleanup if deps change before delay finishes
		return () => {
			clearTimeout(handler);
		};
	}, [...deps]);
}
