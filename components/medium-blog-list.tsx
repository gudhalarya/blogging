'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Filter, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Link from 'next/link'
import { BLOGS } from '@/lib/blog-data'
import { ArticleCard } from './article-card'

export function MediumBlogList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const resultsRef = useRef<HTMLDivElement>(null)

  const allTags = Array.from(new Set(BLOGS.flatMap((blog) => blog.tags)))

  let filteredBlogs = BLOGS.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  if (sortBy === 'trending') {
    filteredBlogs = [...filteredBlogs].sort(
      (a, b) => parseInt(b.id.charCodeAt(0).toString()) - parseInt(a.id.charCodeAt(0).toString())
    )
  } else {
    filteredBlogs = [...filteredBlogs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  // Animate results when filters change
  useEffect(() => {
    if (resultsRef.current) {
      const cards = resultsRef.current.querySelectorAll('[data-result-card]')
      if (cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        })
      }
    }
  }, [searchTerm, selectedTag, sortBy])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-4">
            Explore Stories
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing articles from our community of writers
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 space-y-4 md:space-y-0 md:flex md:gap-4 md:items-end"
        >
          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Stories
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Tag Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition w-full md:w-48"
            >
              <option value="">All Categories</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition w-full md:w-48"
            >
              <option value="recent">Most Recent</option>
              <option value="trending">Trending</option>
            </select>
          </div>
        </motion.div>

        {/* Results */}
        {filteredBlogs.length > 0 ? (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <p className="text-gray-600">
                Found <span className="font-semibold">{filteredBlogs.length}</span> stories
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((article, index) => (
                <div key={article.id} data-result-card>
                  <ArticleCard
                    article={article}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg mb-4">
              No stories found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedTag('')
              }}
              className="text-black font-medium hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
