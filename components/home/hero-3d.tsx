"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { memo } from "react"
import { useMobile } from "@/hooks/use-mobile"

// Optimize the 3D scene based on device capabilities
const Scene3D = () => {
  const isMobile = useMobile()

  // Reduce complexity for mobile devices
  const sphereArgs: [number, number, number] = isMobile
    ? [1.2, 50, 100] // Lower resolution for mobile
    : [1.5, 100, 200] // Higher resolution for desktop

  // Reduce animation complexity for mobile
  const distortAmount = isMobile ? 0.3 : 0.5
  const speedAmount = isMobile ? 1 : 2

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]} // Limit pixel ratio for better performance
      performance={{ min: 0.5 }} // Allow performance scaling
      frameloop={isMobile ? "demand" : "always"} // Only render when needed on mobile
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Sphere args={sphereArgs} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#06b6d4"
          attach="material"
          distort={distortAmount}
          speed={speedAmount}
          roughness={0.28}
          metalness={0.72}
        />
      </Sphere>
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={isMobile ? 0.3 : 0.5}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(Scene3D)
