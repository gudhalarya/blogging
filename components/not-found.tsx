'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Home, BookOpen } from 'lucide-react'

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* Animated 404 */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8"
        >
          <h1 className="text-9xl font-serif font-bold text-black opacity-20 mb-0">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <h2 className="text-4xl font-serif font-bold text-black mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Sorry, we can't find the page you're looking for. The story might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 px-8 py-3 border border-black text-black rounded-full font-medium hover:bg-gray-50 transition"
          >
            <BookOpen className="w-5 h-5" />
            Browse Stories
          </Link>
        </div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-600 mb-6">Here are some helpful links:</p>
          <div className="space-y-2 text-sm">
            <Link href="/" className="block text-black hover:text-gray-700 transition">
              → Home Page
            </Link>
            <Link href="/blog" className="block text-black hover:text-gray-700 transition">
              → All Stories
            </Link>
            <Link href="/about" className="block text-black hover:text-gray-700 transition">
              → About Us
            </Link>
            <Link href="/contact" className="block text-black hover:text-gray-700 transition">
              → Contact Us
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
