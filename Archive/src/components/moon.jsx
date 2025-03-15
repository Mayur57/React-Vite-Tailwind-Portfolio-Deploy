import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function Moon() {
  const moonRef = useRef();
  const { scene } = useGLTF("/models/moon.gltf"); // Ensure correct path
  const { camera } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Apply rotation effect
  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.002;
    }
  });

  // Update camera position for mobile
  useEffect(() => {
    if (isMobile) {
      camera.position.set(0, 0, 7.5); // Move back for mobile
    } else {
      camera.position.set(0, 0, 5); // Normal for desktop
    }
  }, [isMobile, camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1.5} />
      <spotLight position={[5, 5, 5]} angle={0.3} intensity={2} penumbra={1} />
      
      {/* Adjust scale & position for mobile */}
      <primitive 
        object={scene} 
        ref={moonRef} 
        scale={isMobile ? 3.5 : 2} 
        position={[0, isMobile ? -1 : 0, isMobile ? -4 : -3]} 
      />
    </>
  );
}
