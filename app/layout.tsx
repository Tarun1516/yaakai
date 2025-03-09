import type React from "react"
import { AuthProvider } from "@/lib/useAuth"
import { CartProvider } from "@/lib/CartContext"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import NetworkStatus from "@/components/NetworkStatus"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Yaakai - Innovative Cybersecurity Solutions</title>
        <meta
          name="description"
          content="Yaakai provides innovative cybersecurity solutions designed to keep your business safe."
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
            <NetworkStatus />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
