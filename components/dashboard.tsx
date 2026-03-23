"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, BookOpen, Users, TrendingUp, Edit, Eye } from "lucide-react"
import { BLOGS } from "@/lib/blog-data"

export const Dashboard = () => {
  // Mock user data - in a real app this would come from authentication
  const userBlogs = BLOGS.slice(0, 2) // Simulate user's blogs
  const stats = {
    totalBlogs: userBlogs.length,
    totalViews: 1250,
    totalLikes: 89,
    followers: 42
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Your Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your blogs, track your progress, and connect with readers
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Total Blogs</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalBlogs}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="w-6 h-6 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Total Views</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-medium text-gray-600">Likes</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalLikes}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-orange-600" />
              <span className="text-sm font-medium text-gray-600">Followers</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.followers}</p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/create-blog"
              className="flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
            >
              <div className="p-3 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Write New Blog</h3>
                <p className="text-sm text-gray-600">Share your thoughts with the world</p>
              </div>
            </Link>

            <Link
              href="/blog"
              className="flex items-center gap-4 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
            >
              <div className="p-3 bg-green-600 rounded-lg group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Browse Blogs</h3>
                <p className="text-sm text-gray-600">Read what others are writing</p>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Your Blogs */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Blogs</h2>
            <Link
              href="/create-blog"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Write New
            </Link>
          </div>

          {userBlogs.length > 0 ? (
            <div className="space-y-4">
              {userBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{blog.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{blog.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{blog.date}</span>
                      <span>{blog.readTime} min read</span>
                      <span>{blog.tags.length} tags</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/blog/${blog.id}`}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs yet</h3>
              <p className="text-gray-600 mb-4">Start writing your first blog post</p>
              <Link
                href="/create-blog"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Write Your First Blog
              </Link>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="w-full pt-24 pb-12 flex justify-center items-center"
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