import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { OrbitControls, Preload } from "@react-three/drei"
import CyberBackground from "@/components/CyberBackground"
import type React from "react" // Import React

const Scene = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Suspense fallback={null}>
          <CyberBackground />
          <OrbitControls enableZoom={false} />
          <Preload all />
        </Suspense>
      </Canvas>
      <div className="absolute top-0 left-0 w-full h-full overflow-auto">{children}</div>
    </div>
  )
}

export default Scene

