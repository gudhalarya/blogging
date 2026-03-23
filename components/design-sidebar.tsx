"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRightCircle, Home, BookOpen, User, Plus, LogIn, UserPlus, Users, MessageSquare } from "lucide-react"
import Image from "next/image"

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "All Blogs", href: "/blog", icon: BookOpen },
  { name: "Write", href: "/create-blog", icon: Plus },
  { name: "About", href: "/about", icon: Users },
  { name: "Contact", href: "/contact", icon: MessageSquare },
  { name: "Profile", href: "/dashboard", icon: User },
]

const QUOTES = [
  "The best way to predict the future is to create it.",
  "Innovation distinguishes between a leader and a follower.",
  "The only way to do great work is to love what you do.",
  "Stay hungry, stay foolish.",
  "Think different.",
]

export const DesignSidebar = () => {
  const [quoteIndex, setQuoteIndex] = useState(0)

  // Auto-rotate quotes
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <nav className="flex flex-col justify-between w-full h-full bg-[#f5f5f5] p-9 pr-12 overflow-hidden font-sans select-none">
      {/* Top Content */}
      <div className="flex flex-col gap-6 w-full">
        <div className="w-10 h-10 flex items-center justify-start cursor-pointer hover:scale-105 transition-transform">
          <Image
            src="/images/vessel-20logo-404x.png"
            alt="Blog Logo"
            width={40}
            height={40}
            className="w-auto h-10"
          />
        </div>

        {/* Text + Button Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-[38px] leading-[44px] text-[#0f0f12] text-balance font-semibold tracking-[-0.04em]">
              Share your thoughts with the world.
            </h1>
            <p className="text-[16px] leading-[22.4px] text-[#0f0f12] opacity-80 font-normal tracking-[-0.4px] text-balance">
              Join our community of writers and readers. Create, share, and discover amazing stories.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/create-blog"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0f0f12] text-white shadow-[inset_0_4px_16px_1px_rgba(255,255,255,0.22),0_2px_12px_0_rgba(0,0,0,0.25)] hover:bg-[#191775] transition-all cursor-pointer group"
              style={{
                borderRadius: "42px",
              }}
            >
              <span className="text-lg tracking-[-0.6px] font-medium font-display whitespace-nowrap">
                Start Writing
              </span>
              <ArrowRightCircle size={20} className="transition-transform duration-300 group-hover:-rotate-45" />
            </Link>

            <div className="flex gap-2">
              <Link
                href="/login"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-[#0f0f12] border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                <LogIn size={16} />
                <span className="text-sm font-medium">Login</span>
              </Link>
              <Link
                href="/signup"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <UserPlus size={16} />
                <span className="text-sm font-medium">Sign Up</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-[#0f0f12] hover:bg-white/50 rounded-lg transition-colors group"
            >
              <item.icon size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Content */}
      <div className="flex flex-col gap-6 w-full mt-auto pt-10">
        {/* Quote Section */}
        <div className="h-24 w-full max-w-[288px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col gap-2"
            >
              <p className="text-[14px] leading-[18px] text-black font-normal tracking-[-0.2px] text-balance italic">
                "{QUOTES[quoteIndex]}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots */}
          <div className="flex gap-1 mt-4">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setQuoteIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === quoteIndex ? "bg-black w-3" : "bg-neutral-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
