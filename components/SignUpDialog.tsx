"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/useAuth"
import type React from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import LogoSpinner from "@/components/LogoSpinner"

interface SignUpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLoginClick: () => void
}

export default function SignUpDialog({ open, onOpenChange, onLoginClick }: SignUpDialogProps) {
  const [username, setUsername] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { signUp, error, clearError } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    setIsLoading(true)
    try {
      await signUp(email, password, username, phoneNumber)
      onOpenChange(false)
    } catch (error) {
      // Error is handled by the auth context
      console.error("Sign-up error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      clearError()
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-4">Create Account</DialogTitle>
        </DialogHeader>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full"
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full"
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full"
          />
          <Button
            type="submit"
            className="w-full bg-[#f59f0a] text-black border-2 border-[#f59f0a] hover:bg-[#f59f0a]/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LogoSpinner size="small" />
                <span className="ml-2">Signing up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <button onClick={onLoginClick} className="text-blue-600 hover:underline">
            Sign In
          </button>
        </p>
      </DialogContent>
    </Dialog>
  )
}

