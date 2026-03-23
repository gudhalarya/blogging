'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Share2, Heart, BookmarkPlus, Clock, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { BLOGS } from '@/lib/blog-data'
import { ArticleCard } from './article-card'

interface MediumBlogDetailProps {
  blogId: string
}

// Simple markdown renderer
function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n')
  const elements: React.ReactElement[] = []

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-4xl font-serif font-bold text-black mt-8 mb-4">
          {line.substring(2)}
        </h1>
      )
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-3xl font-serif font-bold text-black mt-6 mb-3">
          {line.substring(3)}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-2xl font-serif font-bold text-black mt-5 mb-2">
          {line.substring(4)}
        </h3>
      )
    } else if (line.startsWith('- ')) {
      const listItems = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(
          <li key={i} className="mb-2">
            {lines[i].substring(2)}
          </li>
        )
        i++
      }
      elements.push(
        <ul key={`list-${i}`} className="list-disc list-inside mb-6 text-lg text-gray-700 leading-relaxed">
          {listItems}
        </ul>
      )
      i--
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6"
        >
          {line.substring(2)}
        </blockquote>
      )
    } else if (line.trim()) {
      elements.push(
        <p key={i} className="text-lg text-gray-700 leading-relaxed mb-6">
          {line}
        </p>
      )
    } else {
      elements.push(<div key={i} className="h-2" />)
    }

    i++
  }

  return <>{elements}</>
}

export function MediumBlogDetail({ blogId }: MediumBlogDetailProps) {
  const blog = BLOGS.find((b) => b.id === blogId)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Article not found</p>
      </div>
    )
  }

  const relatedArticles = BLOGS.filter(
    (b) => b.id !== blogId && b.tags.some((tag) => blog.tags.includes(tag))
  ).slice(0, 3)

  const otherArticles = BLOGS.filter((b) => b.id !== blogId).slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 border-b border-gray-200"
      >
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-black mb-8 hover:text-gray-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Stories
          </Link>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold">{blog.author.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold text-black">{blog.author}</p>
                <p className="text-sm text-gray-500">
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLiked(!liked)}
                className={`p-2 rounded-full transition ${
                  liked
                    ? 'bg-red-100 text-red-600'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={liked ? 'currentColor' : 'none'}
                />
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 rounded-full transition ${
                  bookmarked
                    ? 'bg-gray-200 text-black'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <BookmarkPlus className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-medium text-gray-700 bg-gray-200 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Featured Image */}
      {blog.image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative h-96 md:h-[500px] overflow-hidden"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
      )}

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-12"
      >
        <MarkdownContent content={blog.content} />

        {/* Article Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {blog.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-black text-lg">{blog.author}</p>
                <p className="text-sm text-gray-500">
                  Contributed {blog.readTime} minute read
                </p>
              </div>
            </div>
            <button className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition">
              Follow
            </button>
          </div>

          {/* Reading Stats */}
          <div className="grid grid-cols-3 gap-4 bg-gray-50 p-6 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 mb-1">Reading time</p>
              <p className="text-2xl font-bold text-black flex items-center gap-1">
                <Clock className="w-5 h-5" />
                {blog.readTime} min
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Published</p>
              <p className="text-lg font-semibold text-black">
                {new Date(blog.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Words</p>
              <p className="text-2xl font-bold text-black">
                {Math.floor(blog.content.length / 5)}
              </p>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Related Articles */}
      {(relatedArticles.length > 0 || otherArticles.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-3xl font-serif font-bold text-black mb-8">
            {relatedArticles.length > 0 ? 'Related Stories' : 'More Stories'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(relatedArticles.length > 0 ? relatedArticles : otherArticles).map(
              (article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={index}
                />
              )
            )}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 my-12 bg-gray-50 rounded-2xl"
      >
        <h3 className="text-2xl font-serif font-bold text-black mb-4 text-center">
          Get more great stories delivered to your inbox
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          />
          <button className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition">
            Subscribe
          </button>
        </div>
      </motion.section>
    </div>
  )
}
