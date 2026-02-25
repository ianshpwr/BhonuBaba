import { useRef, useEffect } from 'react';
import { silkConfig } from './silkConfig';

export const useSilkPhysics = () => {
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const strength = useRef(0);
    const targetStrength = useRef(0);
    const velocity = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX / window.innerWidth,
                y: 1.0 - (e.clientY / window.innerHeight)
            };
            targetStrength.current = silkConfig.physics.mouseForce;
        };

        const handleMouseLeave = () => {
            targetStrength.current = 0;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        let rafId: number;
        const update = () => {
            // Spring damping physics for the ripple strength
            const acceleration = (targetStrength.current - strength.current) * silkConfig.physics.springStrength;
            velocity.current += acceleration;
            velocity.current *= silkConfig.physics.damping;
            strength.current += velocity.current;

            // Automatic decay of target force to prevent sticking
            targetStrength.current *= 0.96;

            rafId = requestAnimationFrame(update);
        };

        rafId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return { mouseRef, strengthRef: strength };
};
