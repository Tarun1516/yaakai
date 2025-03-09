"use client"

import { useAuth } from "@/lib/useAuth"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function ProfileSection() {
  const { user, logout } = useAuth()

  if (!user) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">My Profile</h2>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Name</label>
          <p className="p-2 bg-white/50 rounded-lg">{user.name || "N/A"}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Email</label>
          <p className="p-2 bg-white/50 rounded-lg">{user.email}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Phone Number</label>
          <p className="p-2 bg-white/50 rounded-lg">{user.phoneNumber || "N/A"}</p>
        </div>
        <div className="flex justify-center mt-8">
          <Button onClick={() => logout()} className="bg-[#ee4544] hover:bg-[#ee4544]/90 text-white">
            Logout
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

