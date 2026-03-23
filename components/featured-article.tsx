'use client'

import Link from 'next/link'
import { ArrowRight, Clock, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { BlogPost } from '@/lib/blog-data'

gsap.registerPlugin(ScrollTrigger)

interface FeaturedArticleProps {
  article: BlogPost
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Stagger animation for text content
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('[data-stagger]')
      gsap.from(elements, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          once: true
        }
      })
    }

    // Parallax effect for image
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
          markers: false
        }
      })
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div ref={contentRef}>
          <span className="inline-block text-sm font-medium text-gray-600 mb-4 uppercase tracking-wide" data-stagger>
            Featured Story
          </span>
          <Link href={`/blog/${article.id}`} data-stagger>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4 cursor-pointer hover:text-gray-800 transition line-clamp-3">
              {article.title}
            </h2>
          </Link>
          <p className="text-lg text-gray-600 mb-6 line-clamp-3" data-stagger>
            {article.excerpt}
          </p>
          <div className="flex items-center gap-6 mb-8 flex-wrap" data-stagger>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <User className="w-4 h-4" />
              {article.author}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {article.readTime} min read
            </div>
            <span className="text-sm text-gray-500">
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <Link
            href={`/blog/${article.id}`}
            className="inline-flex items-center gap-2 text-black font-medium hover:gap-3 transition"
            data-stagger
          >
            Read Full Story
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Right Image */}
        {article.image && (
          <motion.div
            ref={imageRef}
            whileHover={{ scale: 1.02 }}
            className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
