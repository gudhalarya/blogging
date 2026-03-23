export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  date: string
  tags: string[]
  image?: string
  readTime: number
}

export const BLOGS: BlogPost[] = [
  {
    id: "welcome-to-our-blog",
    title: "Welcome to Our Blog",
    content: `
# Welcome to Our Blog

This is the first post on our new blogging platform. We're excited to share our thoughts, ideas, and experiences with you.

## What to Expect

- Regular updates on technology and development
- Insights into design and user experience
- Personal stories and reflections
- Tutorials and how-to guides

## Getting Started

To get started, you can browse through our existing posts or create an account to start writing your own blogs.

Stay tuned for more content!
    `,
    excerpt: "This is the first post on our new blogging platform. We're excited to share our thoughts, ideas, and experiences with you.",
    author: "Admin",
    date: "2024-01-15",
    tags: ["welcome", "introduction"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop&q=80",
    readTime: 2
  },
  {
    id: "the-art-of-writing",
    title: "The Art of Writing",
    content: `
# The Art of Writing

Writing is not just about putting words on paper; it's about expressing ideas, emotions, and experiences in a way that resonates with readers.

## Finding Your Voice

Every writer has a unique voice. It's important to discover what makes your writing special and authentic.

## Practice Makes Perfect

Like any skill, writing improves with practice. Set aside time each day to write, even if it's just a few sentences.

## Reading and Learning

Read widely and learn from other writers. Analyze what works and what doesn't in the writing you admire.

Remember, the journey of writing is as important as the destination. Enjoy the process!
    `,
    excerpt: "Writing is not just about putting words on paper; it's about expressing ideas, emotions, and experiences in a way that resonates with readers.",
    author: "Jane Doe",
    date: "2024-01-20",
    tags: ["writing", "creativity"],
    image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=1200&h=600&fit=crop&q=80",
    readTime: 3
  },
  {
    id: "design-trends-2024",
    title: "Design Trends for 2024",
    content: `
# Design Trends for 2024

As we move into 2024, several design trends are shaping the digital landscape.

## Minimalism Continues

Clean, simple designs remain popular, focusing on functionality and user experience.

## Dark Mode Everywhere

Dark mode interfaces are becoming standard, offering better battery life and reduced eye strain.

## Micro-interactions

Small, delightful animations that provide feedback and enhance user engagement.

## Accessibility First

Designers are prioritizing accessibility, making sure everyone can use and enjoy digital products.

These trends reflect a maturing industry that values user experience above all else.
    `,
    excerpt: "As we move into 2024, several design trends are shaping the digital landscape.",
    author: "John Smith",
    date: "2024-01-25",
    tags: ["design", "trends", "ui"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop&q=80",
    readTime: 4
  }
]