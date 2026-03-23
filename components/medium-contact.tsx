'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
import Link from 'next/link'

export function MediumContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600">
            Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Mail className="w-8 h-8 text-black mt-1" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black mb-2">Email</h3>
                <p className="text-gray-600 mb-1">hello@bloghub.com</p>
                <p className="text-sm text-gray-500">
                  We'll get back to you within 24 hours
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <MapPin className="w-8 h-8 text-black mt-1" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black mb-2">Address</h3>
                <p className="text-gray-600">Global Community</p>
                <p className="text-sm text-gray-500">
                  Available worldwide 24/7
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4">Follow Us</h3>
              <div className="flex gap-6">
                {['Twitter', 'LinkedIn', 'Facebook'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-600 hover:text-black transition"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                placeholder="What is this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition resize-none"
                placeholder="Your message..."
              />
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center"
              >
                ✓ Thank you! We've received your message.
              </motion.div>
            ) : (
              <button
                type="submit"
                className="w-full px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            )}
          </motion.form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 border-t border-gray-200">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-serif font-bold text-black text-center mb-12"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              q: 'How do I start writing on BlogHub?',
              a: 'Simply sign up for an account, click "Write a Story", and start sharing! Our editor supports Markdown and rich formatting.',
            },
            {
              q: 'Is it free to publish on BlogHub?',
              a: 'Yes! Publishing on BlogHub is completely free. We believe in making writing accessible to everyone.',
            },
            {
              q: 'How can I grow my audience?',
              a: 'Share quality content regularly, engage with other writers, and use relevant tags to help readers discover your stories.',
            },
            {
              q: 'Can I edit my published stories?',
              a: 'Absolutely. You can edit your published stories anytime from your dashboard.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-black mb-2">{item.q}</h3>
              <p className="text-gray-600">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 text-center bg-black text-white rounded-2xl mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif font-bold mb-4">Still have questions?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Check out our help center or reach out directly
          </p>
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
          >
            Explore Our Stories
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
