"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/useAuth"
import type React from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import LogoSpinner from "@/components/LogoSpinner"

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSignUpClick: () => void
}

export default function LoginDialog({ open, onOpenChange, onSignUpClick }: LoginDialogProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, error, clearError } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signIn(email, password)
      onOpenChange(false)
    } catch (error) {
      // Error is handled by the auth context
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
          <DialogTitle className="text-2xl text-center mb-4">Welcome Back!</DialogTitle>
        </DialogHeader>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email ID"
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
          <Button
            type="submit"
            className="w-full bg-[#f59f0a] text-black border-2 border-[#f59f0a] hover:bg-[#f59f0a]/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LogoSpinner size="small" />
                <span className="ml-2">Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <p className="text-center mt-4">
          Don&apos;t have an account?{" "}
          <button onClick={onSignUpClick} className="text-blue-600 hover:underline">
            Sign Up Now
          </button>
        </p>
      </DialogContent>
    </Dialog>
  )
}

