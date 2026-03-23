import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Faculty_Glyphic, Lora, Inter, Sora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { MediumNavbar } from "@/components/medium-navbar"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _facultyGlyphic = Faculty_Glyphic({ subsets: ["latin"], weight: ["400"] })
const _lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const _inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const _sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "BlogHub - Share Your Stories",
  description: "A modern blogging platform where writers share their thoughts and readers discover amazing stories.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <MediumNavbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
