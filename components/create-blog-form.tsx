"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Eye, X } from "lucide-react"
import Link from "next/link"

export const CreateBlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: ""
  })
  const [isPreview, setIsPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate blog creation (frontend only)
    setTimeout(() => {
      alert("Blog published successfully! (This is just a demo)")
      setIsLoading(false)
      // In a real app, you'd redirect to the blog or dashboard
    }, 1000)
  }

  const renderPreview = (content: string) => {
    const lines = content.split('\n')
    const elements: React.ReactElement[] = []
    let inCodeBlock = false
    let codeBlockContent = ''

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={index} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
              <code>{codeBlockContent.trim()}</code>
            </pre>
          )
          codeBlockContent = ''
          inCodeBlock = false
        } else {
          inCodeBlock = true
        }
      } else if (inCodeBlock) {
        codeBlockContent += line + '\n'
      } else if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
            {line.substring(2)}
          </h1>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-semibold text-gray-900 mt-6 mb-3">
            {line.substring(3)}
          </h2>
        )
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-medium text-gray-900 mt-4 mb-2">
            {line.substring(4)}
          </h3>
        )
      } else if (line.trim() === '') {
        elements.push(<br key={index} />)
      } else {
        elements.push(
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {line}
          </p>
        )
      }
    })

    return elements
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Write New Blog</h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  {isPreview ? "Edit" : "Preview"}
                </button>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Link>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {!isPreview ? (
              <>
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl font-semibold"
                    placeholder="Enter your blog title"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your blog"
                    required
                  />
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="technology, programming, tutorial"
                  />
                </div>

                {/* Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Content (Markdown supported)
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={20}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    placeholder="# Your Blog Content

Write your blog content here using Markdown...

## Section Header

Your content here..."
                    required
                  />
                </div>
              </>
            ) : (
              /* Preview Mode */
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {formData.title || "Untitled Blog"}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {formData.excerpt || "No excerpt provided"}
                  </p>
                  {formData.tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {formData.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="prose prose-lg max-w-none">
                  {renderPreview(formData.content)}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4" />
                {isLoading ? "Publishing..." : "Publish Blog"}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="w-full pt-24 pb-12 flex justify-center items-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-[80px] font-bold text-black tracking-tighter select-none">
            BLOG
          </div>
        </motion.div>
      </div>
    </div>
  )
}