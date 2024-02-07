import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export default function RotatingSphere() {
    const sphereRef = useRef<Mesh>(null);

    useFrame(() => {
        if (sphereRef.current) {
            // This rotates the sphere on each frame
            sphereRef.current.rotation.y += 0.008;
        }
    });

    return (
        <mesh ref={sphereRef}>
            <sphereGeometry args={[2, 12, 12]} />
            <meshStandardMaterial
                color={0x92ff38}
                wireframe
                wireframeLinewidth={2}
            />
        </mesh>
    );
}
