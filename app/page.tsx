"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { ScrollAnimation } from "@/components/ScrollAnimation"
import React, { useState } from "react"
import { useAuth } from "@/lib/useAuth"
import ProfileSection from "@/components/ProfileSection"
import LoginDialog from "@/components/LoginDialog"
import SignUpDialog from "@/components/SignUpDialog"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/CartContext"

export default function Home() {
  const router = useRouter()
  const { addToCart } = useCart()
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const { user } = useAuth()

  const handleAddToCart = () => {
    addToCart({ productId: "checkblock", name: "CheckBlock", price: 13999, quantity: 1 })
    router.push("/cart")
  }

  const handleExploreMore = () => {
    router.push("/explore-checkblock")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Section id="home">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="mb-16 relative"
          >
            <div className="relative w-64 h-64 mx-auto overflow-hidden rounded-full shadow-lg border-4 border-[#f59f0a]/30 outline outline-2 outline-[#f59f0a]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_25-02-26_11-01-30-763.jpg-G4VoQ7jzHkmCJgMaOmBjVkM1bdec9H.jpeg"
                alt="YAAKAI Logo"
                fill
                className="object-cover"
                priority
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#f59f0a]/10 to-transparent"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
            </div>
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#f59f0a] text-black px-6 py-2 rounded-full text-sm font-bold border-2 border-black"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Yaakai
            </motion.div>
          </motion.div>

          <TypewriterEffect
            texts={[
              "Innovative Cybersecurity Solutions",
              "Affordable | Secure | Reliable",
              "Protecting Your Business, One Layer at a Time",
            ]}
          />

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full max-w-4xl mx-auto mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Cybersecurity Reinvented!</h2>
              <p className="text-xl mb-4">Your data, your security—our priority.</p>
              <p className="text-xl mb-8">
                <strong>Next-gen cyber solutions</strong> designed to keep your business safe.
              </p>
              <p className="text-lg mb-8">🔐 100% Tested | Easy to Implement | Cutting-Edge Technology</p>
              <Button
                onClick={() => setIsLoginOpen(true)}
                className="text-lg px-8 py-6 rounded-full hover:scale-105 transition-all duration-300 bg-[#f59f0a] text-black border-2 border-[#f59f0a] hover:bg-[#f59f0a]/90 hover:text-white"
              >
                Get Started →
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
            <FeatureCard title="Advanced Security" description="Modern cyber solutions tailored for you." delay={0.2} />
            <FeatureCard
              title="Affordable Pricing"
              description="High-end protection without high-end costs."
              delay={0.4}
            />
            <FeatureCard title="Tested & Trusted" description="Rigorous testing ensures safety." delay={0.6} />
            <FeatureCard title="Easy Integration" description="No complex setups, just security!" delay={0.8} />
          </div>
        </Section>

        <Section id="products">
          <ScrollAnimation className="w-full max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="col-span-full lg:col-span-1">
                <div className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex flex-col items-center">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-hTVjebWZn2bbt2ibgO9c3Te219X2gU.png"
                      alt="CHECKBLOCK Logo"
                      width={300}
                      height={120}
                      className="mb-6"
                      priority
                    />
                    <h3 className="text-xl font-semibold mb-4">Checkblock - VPN detector and blocker</h3>
                    <p className="text-center mb-8">
                      Advanced cybersecurity solution designed to detect and block VPN connections, ensuring secure and
                      authentic network access.
                    </p>
                    <div className="flex space-x-4 mt-auto">
                      <Button
                        onClick={handleAddToCart}
                        className="bg-[#f59f0a] text-black border-2 border-[#f59f0a] hover:bg-[#f59f0a]/90 rounded-full px-6 py-2"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        onClick={handleExploreMore}
                        variant="outline"
                        className="border-2 border-[#f59f0a] hover:bg-[#f59f0a]/10 rounded-full px-6 py-2"
                      >
                        Explore More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Space for future products */}
            </div>
          </ScrollAnimation>
        </Section>

        <Section id="about">
          <ScrollAnimation className="w-full max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">About Yaakai</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AboutCard
                title="Who We Are"
                content="We are a team of passionate cybersecurity experts committed to addressing modern security challenges with state-of-the-art technology. At Yaakai, we believe that strong digital security should be accessible to all businesses, regardless of size."
              />
              <AboutCard
                title="What We Offer"
                content="Yaakai provides a wide range of cybersecurity solutions, including modern applications and services tailored to protect businesses from cyber threats. Our products are designed to be affordable, easy to integrate, and highly efficient in preventing security breaches."
              />
              <AboutCard
                title="Our Mission"
                content="Our goal is to offer reliable, affordable, and easy-to-implement cybersecurity products that ensure complete protection against emerging cyber threats. With a focus on innovation, safety, and efficiency, we aim to empower organizations with advanced security tools."
              />
              <AboutCard
                title="How Safe Are We?"
                content="Security is our top priority. All our cybersecurity solutions undergo rigorous testing in controlled environments before they reach our clients. We implement the latest security protocols, encryption standards, and compliance measures to guarantee maximum protection."
              />
            </div>
          </ScrollAnimation>
        </Section>

        {user && (
          <Section id="profile">
            <ScrollAnimation className="w-full">
              <ProfileSection />
            </ScrollAnimation>
          </Section>
        )}

        <Section id="contact" className="pb-0">
          <ScrollAnimation className="w-full max-w-4xl mx-auto" duration={1.5}>
            <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
            <div className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-20">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input id="name" placeholder="Your Name" className="w-full bg-white/50 border-2 border-[#f59f0a]" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-white/50 border-2 border-[#f59f0a]"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message here..."
                    className="w-full bg-white/50 border-2 border-[#f59f0a]"
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#f59f0a] text-black border-2 border-[#f59f0a] hover:bg-[#f59f0a]/90 rounded-full px-6 py-2"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </ScrollAnimation>
        </Section>
        <div className="w-full max-w-4xl mx-auto text-center mb-20">
          <p className="text-lg">
            For enterprise inquiries, please contact:{" "}
            <a href="mailto:contact@yaakai.com" className="text-[#f59f0a] hover:underline">
              contact@yaakai.com
            </a>
          </p>
        </div>
      </main>

      <Footer />

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
    </div>
  )
}

const Section = ({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`min-h-screen w-full flex flex-col items-center justify-center py-32 px-4 ${className}`}>
    {children}
  </section>
)

const FeatureCard = ({ title, description, delay }: { title: string; description: string; delay: number }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
  >
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <p className="text-lg">{description}</p>
  </motion.div>
)

const ServiceCard = ({ title, description }: { title: string; description: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
    <p className="text-lg">{description}</p>
  </motion.div>
)

const AboutCard = ({ title, content }: { title: string; content: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
    <p className="text-lg leading-relaxed">{content}</p>
  </motion.div>
)

const TypewriterEffect = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0)
  const [currentText, setCurrentText] = React.useState("")

  React.useEffect(() => {
    let timeout: NodeJS.Timeout

    if (currentText.length < texts[currentTextIndex].length) {
      timeout = setTimeout(() => {
        setCurrentText(texts[currentTextIndex].slice(0, currentText.length + 1))
      }, 100)
    } else {
      timeout = setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
        setCurrentText("")
      }, 2000)
    }

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, texts])

  return (
    <motion.p
      className="text-2xl mb-12 h-16 min-h-[4rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {currentText}
    </motion.p>
  )
}

const Footer = () => (
  <footer className="w-full bg-white/30 backdrop-blur-md py-8 mt-20">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Yaakai</h3>
          <p className="text-sm mb-2">"Smart Security, Stronger Future."</p>
          <p className="text-sm">© 2025 All rights reserved.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="text-sm hover:text-[#f59f0a]">
                Home
              </a>
            </li>
            <li>
              <a href="#products" className="text-sm hover:text-[#f59f0a]">
                Products
              </a>
            </li>
            <li>
              <a href="#about" className="text-sm hover:text-[#f59f0a]">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="text-sm hover:text-[#f59f0a]">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-2">
            <li className="text-sm">Email: info@yaakai.com</li>
            <li className="text-sm">Location: Salem, Tamilnadu</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
)

