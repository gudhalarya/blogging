'use client'

import Link from 'next/link'
import { Clock, User, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import type { BlogPost } from '@/lib/blog-data'

interface ArticleCardProps {
  article: BlogPost
  variant?: 'grid' | 'compact'
  index?: number
}

export function ArticleCard({
  article,
  variant = 'grid',
  index = 0,
}: ArticleCardProps) {
  const [liked, setLiked] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseEnter = () => {
      gsap.to(card, {
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        y: -8,
        duration: 0.3,
        ease: 'power2.out'
      })
      
      const image = card.querySelector('img')
      if (image) {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
      
      const image = card.querySelector('img')
      if (image) {
        gsap.to(image, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const cardContent = (
    <>
      {/* Image */}
      {article.image && (
        <div className="relative h-48 overflow-hidden rounded-lg mb-4">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      )}

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {article.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg md:text-xl font-serif font-bold text-black mb-2 line-clamp-2">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2">
        {article.excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-xs text-white font-bold">
              {article.author.charAt(0)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-black">
              {article.author}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {article.readTime} min
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            setLiked(!liked)
          }}
          className={`p-2 rounded-full transition ${
            liked
              ? 'bg-red-100 text-red-600'
              : 'hover:bg-gray-100 text-gray-400'
          }`}
        >
          <Heart className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>
    </>
  )

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/blog/${article.id}`}
        className="group block h-full bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:no-underline"
      >
        {cardContent}
      </Link>
    </motion.div>
  )
}
