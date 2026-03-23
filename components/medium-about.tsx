'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Heart, Zap, Globe } from 'lucide-react'

export function MediumAbout() {
  const features = [
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connect with writers and readers from around the world',
    },
    {
      icon: Heart,
      title: 'Share Your Passion',
      description: 'Express yourself through thoughtful, engaging stories',
    },
    {
      icon: Zap,
      title: 'Instant Publishing',
      description: 'Share your ideas with the world in minutes',
    },
    {
      icon: Users,
      title: 'Engaged Audience',
      description: 'Build an audience of readers who care about your work',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6">
            About BlogHub
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We believe that great ideas deserve to be heard. BlogHub is a platform where writers from all backgrounds can share their stories, insights, and creativity with a global audience of engaged readers.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 border-y border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-black mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              At BlogHub, our mission is to democratize publishing and create a space where thoughtful,
              diverse voices can reach an audience. We believe that everyone has a story worth telling
              and an audience waiting to hear it.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you're a seasoned writer or just starting out, we provide the tools and community
              you need to share your voice and connect with people who share your interests.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-8 md:p-12"
          >
            <blockquote className="text-2xl font-serif italic text-gray-800 mb-4">
              "The best way to express yourself is through writing. BlogHub makes sharing your thoughts with the world effortless."
            </blockquote>
            <p className="text-gray-600">— BlogHub Community</p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-serif font-bold text-black text-center mb-16"
        >
          What We Offer
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition"
              >
                <Icon className="w-10 h-10 text-black mb-4" />
                <h3 className="text-xl font-serif font-bold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 bg-black text-white rounded-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <p className="text-4xl font-bold mb-2">1000+</p>
            <p className="text-gray-300">Active Writers</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">50K+</p>
            <p className="text-gray-300">Published Stories</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">500K+</p>
            <p className="text-gray-300">Engaged Readers</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">150+</p>
            <p className="text-gray-300">Countries</p>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif font-bold text-black mb-4">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of writers and start publishing today
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/signup"
              className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
            >
              Get Started
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 border border-black text-black rounded-full font-medium hover:bg-gray-50 transition"
            >
              Explore Stories
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
