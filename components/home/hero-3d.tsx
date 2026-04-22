"use client"
import { Canvas } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import { memo } from "react"

const Scene3D = () => {
  const sphereArgs: [number, number, number] = [1.5, 48, 96]

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Sphere args={sphereArgs} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#06b6d4"
          attach="material"
          distort={0.42}
          speed={1}
          roughness={0.28}
          metalness={0.72}
        />
      </Sphere>
    </Canvas>
  )
}

export default memo(Scene3D)
