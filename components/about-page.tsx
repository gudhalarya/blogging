"use client"

import { motion } from "framer-motion"
import { Users, BookOpen, Heart, Zap } from "lucide-react"

export const AboutPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Share Your Stories",
      description: "Write and publish your thoughts, experiences, and expertise with our easy-to-use editor."
    },
    {
      icon: Users,
      title: "Build Community",
      description: "Connect with like-minded writers and readers from around the world."
    },
    {
      icon: Heart,
      title: "Get Inspired",
      description: "Discover amazing stories and perspectives that broaden your horizons."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Enjoy a smooth, responsive experience with modern web technologies."
    }
  ]

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero Section */}
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            About BlogHub
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A platform where ideas come to life. We believe everyone has a story worth telling,
            and we're here to provide the perfect space for writers and readers to connect.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="bg-white rounded-2xl p-8 md:p-12 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              To democratize storytelling and create a vibrant community where voices from all walks of life
              can be heard, shared, and celebrated.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">For Writers</h3>
              <p className="text-gray-600 leading-relaxed">
                We provide powerful tools and a supportive environment to help you craft compelling stories,
                reach wider audiences, and grow as a writer. Whether you're a seasoned author or just starting
                your writing journey, BlogHub is your home.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">For Readers</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover diverse perspectives, learn new things, and be inspired by stories from around the world.
                Our platform makes it easy to find content that matters to you and connect with writers who share
                your interests.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Growing Community
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Join thousands of writers and readers who are already part of our community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-sm opacity-80">Active Writers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
              <div className="text-sm opacity-80">Published Blogs</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">100K+</div>
              <div className="text-sm opacity-80">Monthly Readers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-80">Community Support</div>
            </div>
          </div>
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