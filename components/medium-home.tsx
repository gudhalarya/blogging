'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flame, Sparkles } from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BLOGS } from '@/lib/blog-data'
import { FeaturedArticle } from './featured-article'
import { ArticleCard } from './article-card'

gsap.registerPlugin(ScrollTrigger)

export function MediumHome() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const filterRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const featuredArticle = BLOGS[0]
  const regularArticles = BLOGS.slice(1)

  const categories = [
    { id: 'all', label: 'All Stories', icon: Sparkles },
    { id: 'trending', label: 'Trending', icon: Flame },
  ]

  // Animate category filters on scroll
  useEffect(() => {
    if (filterRef.current) {
      const buttons = filterRef.current.querySelectorAll('button')
      gsap.from(buttons, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        stagger: 0.08,
        ease: 'back.out',
        scrollTrigger: {
          trigger: filterRef.current,
          start: 'top 80%',
          once: true
        }
      })
    }
  }, [])

  // Animate CTA section with scroll
  useEffect(() => {
    if (ctaRef.current) {
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 75%',
          once: true
        }
      })

      // Add subtle floating animation
      gsap.to(ctaRef.current, {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-4">
            Discover Great Ideas
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Read and share thought-provoking stories from writers around the world
          </p>
          <Link
            href="/create-blog"
            className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
          >
            Start Writing
          </Link>
        </motion.div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16 pb-12 border-b border-gray-200">
            <FeaturedArticle article={featuredArticle} />
          </div>
        )}

        {/* Category Filter */}
        <motion.div
          ref={filterRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 mb-12 overflow-x-auto pb-4"
        >
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(id)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition whitespace-nowrap ${
                selectedCategory === id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-black mb-8">
            Latest Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-black text-white rounded-2xl p-12 text-center my-16"
        >
          <h3 className="text-3xl font-serif font-bold mb-4">
            Have a story to share?
          </h3>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of writers and share your thoughts, experiences, and ideas with our community
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
