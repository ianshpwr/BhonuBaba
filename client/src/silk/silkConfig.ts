export const silkConfig = {
    grid: {
        desktop: 128,
        tablet: 64,
        mobile: 32,
    },
    physics: {
        tension: 0.035, // Reduced from 0.04
        damping: 0.96, // Increased from 0.94 (slower return)
        springStrength: 0.015, // Reduced from 0.02
        mouseForce: 0.068, // Reduced amplitude (~15% reduction)
        mouseRadius: 0.28,
        ambientDrift: 0.001, // Calmer drift
    },
    colors: {
        base: "#F6F1EA", // Soft Warm Ivory
        silk: "#F6F1EA",
        highlight: "#FFFBF2", // Warm highlight
        shadow: "#D9D0C4", // Muted depth
        warmAccent: "#C97C5D", // Muted terracotta
    },
    lighting: {
        intensity: 0.95, // Reduced contrast
        ambient: 0.55, // Increased ambient for diffused light
        shininess: 48.0, // Softer highlight curve
    }
};
