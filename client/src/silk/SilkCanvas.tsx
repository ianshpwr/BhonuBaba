import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { silkVertexShader, silkFragmentShader } from './silkShader';
import { silkConfig } from './silkConfig';
import { useSilkPhysics } from './useSilkPhysics';
import { useDevicePerformance } from './useDevicePerformance';

const SilkPlane = () => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const { size, viewport } = useThree();
    const { mouseRef, strengthRef } = useSilkPhysics();
    const { isMobile, isTablet } = useDevicePerformance();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uStrength: { value: 0 },
        uBaseColor: { value: new THREE.Color(silkConfig.colors.base) },
        uShadowColor: { value: new THREE.Color(silkConfig.colors.shadow) },
        uAccentColor: { value: new THREE.Color(silkConfig.colors.warmAccent) },
        uIntensity: { value: silkConfig.lighting.intensity },
        uAmbient: { value: silkConfig.lighting.ambient },
        uShininess: { value: silkConfig.lighting.shininess },
    }), [size.width, size.height]);

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();
            material.uniforms.uMouse.value.lerp(new THREE.Vector2(mouseRef.current.x, mouseRef.current.y), 0.1);
            material.uniforms.uStrength.value = strengthRef.current;
            material.uniforms.uResolution.value.set(size.width, size.height);
        }
    });

    // Decide grid resolution based on device
    const segments = isMobile ? silkConfig.grid.mobile : (isTablet ? silkConfig.grid.tablet : silkConfig.grid.desktop);

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, segments, segments]} />
            <shaderMaterial
                vertexShader={silkVertexShader}
                fragmentShader={silkFragmentShader}
                uniforms={uniforms}
                transparent={false}
            />
        </mesh>
    );
};

export const SilkCanvas: React.FC = () => {
    const { isLowEnd } = useDevicePerformance();

    if (isLowEnd) {
        return (
            <div
                className="fixed inset-0 -z-10"
                style={{ backgroundColor: silkConfig.colors.base }}
            />
        );
    }

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 1], fov: 50 }}
                dpr={window.devicePixelRatio > 1.5 ? 2 : 1}
                gl={{ antialias: false, powerPreference: "high-performance" }}
            >
                <SilkPlane />
            </Canvas>
        </div>
    );
};
