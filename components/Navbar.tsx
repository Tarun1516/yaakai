"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import LoginDialog from "@/components/LoginDialog"
import SignUpDialog from "@/components/SignUpDialog"
import { useAuth } from "@/lib/useAuth"
import { useCart } from "@/lib/CartContext"
import type React from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { user } = useAuth()
  const { cartItems } = useCart()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "products", "about", "contact", "profile"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom > 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigation = (sectionId: string) => {
    if (window.location.pathname === "/") {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      router.push(`/#${sectionId}`)
    }
  }

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4">
      <div className="flex items-center space-x-2 backdrop-blur-md bg-[#fefeff]/30 rounded-full shadow-lg px-4 py-2">
        <motion.div whileHover={{ scale: 1.05 }} className="mr-2" onClick={() => router.push("/")}>
          <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-[#f59f0a] outline outline-1 outline-[#f59f0a] cursor-pointer">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_25-02-26_11-01-30-763.jpg-G4VoQ7jzHkmCJgMaOmBjVkM1bdec9H.jpeg"
              alt="YAAKAI Logo"
              fill
              className="object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#f59f0a]/10 to-transparent"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
        <div className="flex space-x-2">
          <NavButton active={activeSection === "home"} onClick={() => handleNavigation("home")}>
            Home
          </NavButton>
          <NavButton active={activeSection === "products"} onClick={() => handleNavigation("products")}>
            Products
          </NavButton>
          <NavButton active={activeSection === "about"} onClick={() => handleNavigation("about")}>
            <span className="whitespace-nowrap">About Us</span>
          </NavButton>
          <NavButton active={activeSection === "contact"} onClick={() => handleNavigation("contact")}>
            <span className="whitespace-nowrap">Contact Us</span>
          </NavButton>
          {user && (
            <NavButton active={activeSection === "profile"} onClick={() => handleNavigation("profile")}>
              Profile
            </NavButton>
          )}
        </div>
        <div className="flex space-x-2 ml-4">
          {!user ? (
            <>
              <Button
                onClick={() => setIsLoginOpen(true)}
                variant="outline"
                className="rounded-full border border-black text-black hover:bg-transparent whitespace-nowrap"
              >
                Login
              </Button>
              <Button
                onClick={() => setIsSignUpOpen(true)}
                variant="outline"
                className="rounded-full border-2 border-[#f59f0a] bg-[#f59f0a] text-black hover:bg-[#f59f0a]/90 whitespace-nowrap"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => handleNavigation("profile")}
                variant="outline"
                className="rounded-full border-2 border-[#f59f0a] bg-[#f59f0a] text-black hover:bg-[#f59f0a]/90 whitespace-nowrap"
              >
                <span className="whitespace-nowrap">My Profile</span>
              </Button>
              <Button
                onClick={() => router.push("/cart")}
                variant="outline"
                className="rounded-full border-2 border-[#f59f0a] bg-[#f59f0a] text-black hover:bg-[#f59f0a]/90 whitespace-nowrap"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart ({cartItems.length})
              </Button>
            </>
          )}
        </div>
      </div>
      <LoginDialog
        open={isLoginOpen}
        onOpenChange={setIsLoginOpen}
        onSignUpClick={() => {
          setIsLoginOpen(false)
          setIsSignUpOpen(true)
        }}
      />
      <SignUpDialog
        open={isSignUpOpen}
        onOpenChange={setIsSignUpOpen}
        onLoginClick={() => {
          setIsSignUpOpen(false)
          setIsLoginOpen(true)
        }}
      />
    </nav>
  )
}

const NavButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) => (
  <Button
    onClick={onClick}
    variant={active ? "default" : "ghost"}
    className={`transition-all duration-300 rounded-full hover:rounded-lg ${active ? "scale-105" : ""} px-4`}
  >
    {children}
  </Button>
)

export default Navbar

