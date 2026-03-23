"use client"

import { ArrowLeft, Clock, User, Share2, Bookmark } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { BlogPost } from "@/lib/blog-data"

interface BlogDetailProps {
  blog: BlogPost
}

export const BlogDetail = ({ blog }: BlogDetailProps) => {
  // Simple markdown renderer (basic implementation)
  const renderContent = (content: string) => {
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
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
        </motion.div>

        {/* Blog Header */}
        <motion.article
          className="bg-white rounded-2xl overflow-hidden shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {blog.image && (
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Meta Information */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <span>•</span>
              <span>{blog.date}</span>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime} min read</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-12">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <Bookmark className="w-4 h-4" />
                <span className="text-sm">Save</span>
              </button>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {renderContent(blog.content)}
            </div>
          </div>
        </motion.article>

        {/* Footer */}
        <motion.div
          className="w-full pt-24 pb-12 flex justify-center items-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-[120px] font-bold text-black tracking-tighter select-none">
            BLOG
          </div>
        </motion.div>
      </div>
    </div>
  )
}