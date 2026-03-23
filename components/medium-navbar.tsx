'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Search, Menu, X, PenTool } from 'lucide-react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { staggerElements } from '@/utils/gsapAnimations'

export function MediumNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  const isActive = (path: string) => pathname === path

  // Logo animation on mount
  useEffect(() => {
    const navElements = navRef.current?.querySelectorAll('[data-animate]')
    if (navElements?.length) {
      gsap.from(navElements, {
        opacity: 0,
        y: -10,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      })
    }
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (isOpen) {
      const mobileLinks = navRef.current?.querySelectorAll('[data-mobile-item]')
      if (mobileLinks?.length) {
        gsap.from(mobileLinks, {
          opacity: 0,
          x: -20,
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out'
        })
      }
    }
  }, [isOpen])

  return (
    <nav ref={navRef} className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" data-animate>
            <div className="text-2xl font-serif font-bold text-black">
              BlogHub
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden md:flex items-center gap-8 flex-1 ml-12" data-animate>
            <Link
              href="/blog"
              className={`text-sm transition-colors ${
                isActive('/blog')
                  ? 'text-black font-medium'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Explore
            </Link>
            <Link
              href="/about"
              className={`text-sm transition-colors ${
                isActive('/about')
                  ? 'text-black font-medium'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              About
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search stories..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:bg-white focus:border focus:border-gray-300 transition"
              />
            </div>
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-4" data-animate>
            <Link
              href="/create-blog"
              className="flex items-center gap-2 text-gray-600 hover:text-black transition text-sm"
            >
              <PenTool className="w-4 h-4" />
              Write
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <div className="relative" data-mobile-item>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search stories..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none"
              />
            </div>
            <Link
              href="/blog"
              className="block text-sm text-gray-600 hover:text-black py-2"
              data-mobile-item
            >
              Explore
            </Link>
            <Link
              href="/about"
              className="block text-sm text-gray-600 hover:text-black py-2"
              data-mobile-item
            >
              About
            </Link>
            <Link
              href="/create-blog"
              className="block text-sm text-gray-600 hover:text-black py-2"
              data-mobile-item
            >
              Write a Story
            </Link>
            <Link
              href="/signup"
              className="block w-full text-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium"
              data-mobile-item
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
