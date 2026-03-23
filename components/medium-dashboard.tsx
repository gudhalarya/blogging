'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PenTool, BarChart3, Settings, LogOut, BookOpen } from 'lucide-react'
import { BLOGS } from '@/lib/blog-data'

export function MediumDashboard() {
  const userArticles = BLOGS.slice(0, 3)
  const totalViews = 45230
  const totalReads = 12400

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-serif font-bold text-black mb-2">
              Your Dashboard
            </h1>
            <p className="text-gray-600">Manage your stories and track your performance</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Total Views</h3>
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-black">{totalViews.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-2">+12% from last month</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Total Reads</h3>
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-black">{totalReads.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-2">+8% from last month</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Published Stories</h3>
              <PenTool className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-black">{userArticles.length}</p>
            <p className="text-sm text-gray-600 mt-2">Active on platform</p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 mb-12"
        >
          <Link
            href="/create-blog"
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            <PenTool className="w-5 h-5" />
            Write New Story
          </Link>
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </motion.div>

        {/* Your Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-serif font-bold text-black mb-6">Your Stories</h2>
          <div className="space-y-4">
            {userArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                    <span>{article.readTime} min read</span>
                    <span>{Math.floor(Math.random() * 5000)} views</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link
                    href={`/blog/${article.id}`}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
                  >
                    View
                  </Link>
                  <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition">
                    Edit
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <Link
            href="/blog"
            className="inline-block mt-8 text-black font-medium hover:underline"
          >
            View all your stories →
          </Link>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-gray-200"
        >
          <h2 className="text-2xl font-serif font-bold text-black mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className="p-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-left">
              <h3 className="font-semibold text-black mb-2">Profile Settings</h3>
              <p className="text-sm text-gray-600">Update your profile information</p>
            </button>
            <button className="p-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-left">
              <h3 className="font-semibold text-black mb-2">View Analytics</h3>
              <p className="text-sm text-gray-600">Detailed performance metrics</p>
            </button>
            <button className="p-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-left">
              <h3 className="font-semibold text-black mb-2">Manage Subscribers</h3>
              <p className="text-sm text-gray-600">Your audience management</p>
            </button>
            <button className="p-6 border border-red-300 rounded-lg hover:bg-red-50 transition text-left">
              <h3 className="font-semibold text-red-600 mb-2">Sign Out</h3>
              <p className="text-sm text-red-500">End your session</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
