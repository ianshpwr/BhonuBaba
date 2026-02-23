import { useMemo } from 'react';

export const useDevicePerformance = () => {
    return useMemo(() => {
        if (typeof window === "undefined") return { isLowEnd: false, isMobile: false, isTablet: false };

        const ua = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        const isTablet = /iPad|PlayBook|Silk/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        // Simple heuristic for low-end
        const isLowEnd = (navigator.hardwareConcurrency || 4) < 4;

        return { isLowEnd, isMobile, isTablet };
    }, []);
};
