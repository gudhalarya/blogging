'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Save, Eye, Type, FileText } from 'lucide-react'

export function MediumCreateBlogForm() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isPreview, setIsPreview] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      alert('Blog published successfully! (This is a demo)')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-serif font-bold text-black mb-2">
              Write a New Story
            </h1>
            <p className="text-gray-600">Share your thoughts with our community</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Eye className="w-4 h-4" />
              {isPreview ? 'Edit' : 'Preview'}
            </button>
          </div>
        </div>

        {!isPreview ? (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-3">
                Story Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="What's your story about?"
                className="w-full text-4xl font-serif font-bold border-none focus:outline-none placeholder-gray-300"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-3">
                Story Summary
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Write a brief summary to attract readers..."
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition resize-none"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-3">
                Story Content
              </label>
              <div className="relative">
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Start writing your story... (Markdown supported)"
                  rows={15}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition font-mono text-sm resize-none"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Supports Markdown: **bold**, *italic*, `code`, # headings, etc.
              </p>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-3">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Separate tags with commas (e.g., technology, writing, travel)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {isLoading ? 'Publishing...' : 'Publish Story'}
              </button>
              <Link
                href="/blog"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </Link>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-5xl font-serif font-bold text-black mb-4">
                {formData.title || 'Your Story Title'}
              </h1>
              <p className="text-xl text-gray-600">
                {formData.excerpt || 'Your story summary will appear here'}
              </p>
              {formData.tags && (
                <div className="flex gap-3 mt-6 flex-wrap">
                  {formData.tags.split(',').map((tag) => (
                    <span
                      key={tag}
                      className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {formData.content || 'Your story content will appear here'}
              </p>
            </div>

            <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={() => setIsPreview(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Back to Editing
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
