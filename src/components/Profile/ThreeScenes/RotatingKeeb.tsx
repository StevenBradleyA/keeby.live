import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

import model from "@public/3DModels/commodore_64.glb";

// npm install @react-three/fiber three @react-three/drei
// npm install file-loader --save-dev
export default function RotatingKeeb() {
    const keebRef = useRef();
    const { scene } = useGLTF(model); // Use the scene property with useGLTF

    useFrame(() => {
        if (keebRef.current) {
            keebRef.current.rotation.y += 0.008;
        }
    });

    // Apply wireframe material to all meshes in the scene
    if (scene) {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new MeshStandardMaterial({
                    color: 0x92ff38,
                    wireframe: true,
                });
            }
        });
    }

    return <primitive object={scene} ref={keebRef} />;
}
