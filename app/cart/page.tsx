"use client"

import { useCart } from "@/lib/CartContext"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/lib/useAuth"
import LogoSpinner from "@/components/LogoSpinner"

export default function Cart() {
  const router = useRouter()
  const { cartItems, updateQuantity, removeFromCart } = useCart()
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set loading to false once we know if user is authenticated
    setIsLoading(false)

    // Set quantities from cart items
    if (cartItems.length > 0) {
      setQuantities(Object.fromEntries(cartItems.map((item) => [item.id, item.quantity])))
    }
  }, [cartItems])

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantities((prev) => ({ ...prev, [id]: newQuantity }))
      await updateQuantity(id, newQuantity)
    }
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * (quantities[item.id] || item.quantity), 0)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LogoSpinner size="large" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
        <p className="text-xl mb-4">Please log in to view your cart.</p>
        <Button
          onClick={() => router.push("/")}
          className="bg-[#f59f0a] text-black border-2 border-[#f59f0a] hover:bg-[#f59f0a]/90 rounded-full px-6 py-2"
        >
          Return to Home
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Button onClick={() => router.back()} variant="ghost" className="mb-8 hover:bg-transparent">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <Button
            onClick={() => router.push("/")}
            className="bg-[#f59f0a] text-black border-2 border-[#f59f0a] hover:bg-[#f59f0a]/90 rounded-full px-6 py-2"
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-gray-600">Price: ₹{item.price.toLocaleString()} each</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleQuantityChange(item.id, (quantities[item.id] || item.quantity) - 1)}
                      className="w-8 h-8 rounded-full border border-black text-black bg-transparent hover:bg-transparent"
                      disabled={(quantities[item.id] || item.quantity) <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-2 min-w-[2ch] text-center">{quantities[item.id] || item.quantity}</span>
                    <Button
                      onClick={() => handleQuantityChange(item.id, (quantities[item.id] || item.quantity) + 1)}
                      className="w-8 h-8 rounded-full bg-[#f59f0a] text-black border border-black hover:bg-[#f59f0a]/90"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="font-semibold">
                    Subtotal: ₹{(item.price * (quantities[item.id] || item.quantity)).toLocaleString()}
                  </p>
                  <Button onClick={() => removeFromCart(item.id)} variant="destructive" className="rounded-full">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-1">
            <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-lg sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <Button className="w-full bg-[#f59f0a] text-black border-2 border-[#f59f0a] hover:bg-[#f59f0a]/90 rounded-full px-8 py-3 text-lg">
                Proceed to Pay
              </Button>
              <div className="mt-4 text-sm text-gray-600 text-center">
                For enterprise inquiries, please contact:
                <br />
                <a href="mailto:contact@yaakai.com" className="text-[#f59f0a] hover:underline">
                  contact@yaakai.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

