import { useMediaQuery } from '@react-hookz/web';

const BREAKPOINT_TABLET = 410;
const BREAKPOINT_DESKTOP = 834;

export function useDevice() {
    const isMobile = useMediaQuery(`(max-width: ${BREAKPOINT_TABLET}px)`, true);
    const isTablet = useMediaQuery(`(max-width: ${BREAKPOINT_DESKTOP}px)`, true);

    return {
        isMobile,
        isTablet,
    };
}
