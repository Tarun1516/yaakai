"use client"
import Image from "next/image"
import { motion } from "framer-motion"

export default function LogoSpinner({ size = "medium" }: { size?: "small" | "medium" | "large" }) {
  const sizeMap = {
    small: { width: 40, height: 40 },
    medium: { width: 60, height: 60 },
    large: { width: 100, height: 100 },
  }

  const { width, height } = sizeMap[size]

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative overflow-hidden rounded-full border-2 border-[#f59f0a] outline outline-1 outline-[#f59f0a]"
        style={{ width, height }}
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "linear",
          },
          scale: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          },
        }}
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_25-02-26_11-01-30-763.jpg-G4VoQ7jzHkmCJgMaOmBjVkM1bdec9H.jpeg"
          alt="YAAKAI Logo"
          fill
          className="object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#f59f0a]/20 to-transparent"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}

