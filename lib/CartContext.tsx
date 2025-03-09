"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { databases, DATABASE_ID, PRODUCTS_COLLECTION_ID } from "./appwrite"
import { ID, Query } from "appwrite"

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "id">) => Promise<void>
  removeFromCart: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const auth = useContext(AuthContext) // Get auth context directly
  const user = auth?.user || null

  useEffect(() => {
    if (user) {
      fetchCartItems()
    } else {
      setCartItems([])
    }
  }, [user])

  const fetchCartItems = async () => {
    if (!user) return

    try {
      const response = await databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION_ID, [
        Query.equal("userId", user.$id),
      ])
      setCartItems(response.documents as unknown as CartItem[])
    } catch (error) {
      console.error("Error fetching cart items:", error)
      // Don't update state on error to keep any existing items
    }
  }

  const addToCart = async (item: Omit<CartItem, "id">) => {
    if (!user) return

    try {
      // Check if the item already exists in the cart
      const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.productId === item.productId)

      if (existingItemIndex >= 0) {
        // If item exists, update quantity
        const existingItem = cartItems[existingItemIndex]
        const newQuantity = existingItem.quantity + item.quantity
        await updateQuantity(existingItem.id, newQuantity)
      } else {
        // If item doesn't exist, create new item
        const newItem = await databases.createDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, ID.unique(), {
          userId: user.$id,
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })
        setCartItems([...cartItems, newItem as unknown as CartItem])
      }
    } catch (error: any) {
      console.error("Error adding item to cart:", error)
      if (error.message === "Failed to fetch") {
        // Handle offline mode - could add to local storage here
        alert("Network error. Please check your connection and try again.")
      }
    }
  }

  const removeFromCart = async (id: string) => {
    if (!user) return

    try {
      await databases.deleteDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, id)
      setCartItems(cartItems.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Error removing item from cart:", error)
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    if (!user) return

    try {
      await databases.updateDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, id, { quantity })
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    } catch (error) {
      console.error("Error updating item quantity:", error)
    }
  }

  const clearCart = async () => {
    if (!user) return

    try {
      await Promise.all(cartItems.map((item) => databases.deleteDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, item.id)))
      setCartItems([])
    } catch (error) {
      console.error("Error clearing cart:", error)
    }
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Import AuthContext here to avoid circular dependency
import { AuthContext } from "./useAuth"

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

