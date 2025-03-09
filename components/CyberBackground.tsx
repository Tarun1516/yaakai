import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Box } from "@react-three/drei"
import type * as THREE from "three"

const CyberBackground = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      <Sphere args={[5, 64, 64]} position={[0, 0, -10]}>
        <meshBasicMaterial color="#0066cc" wireframe />
      </Sphere>
      <Box args={[2, 2, 2]} position={[3, 2, -5]}>
        <meshNormalMaterial />
      </Box>
      <Box args={[1, 1, 1]} position={[-3, -2, -3]}>
        <meshNormalMaterial />
      </Box>
      {/* Add more 3D elements related to cybersecurity here */}
    </group>
  )
}

export default CyberBackground

