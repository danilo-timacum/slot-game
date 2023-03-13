// https://simbathesailor.dev/useismounted-ref-vs-state-approach%20/

// original:
import { useEffect, useState } from 'react';

export function useIsMounted() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	return mounted;
}
