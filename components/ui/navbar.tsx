'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: {
    text: string;
    href?: string;
  };
  links?: NavLink[];
}

const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  ({ className, logo, links = [], ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const defaultLinks: NavLink[] = [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ];

    const navLinks = links.length > 0 ? links : defaultLinks;

    // Disable scroll when menu is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    // Animation variants for the full-screen menu
    const menuVariants = {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.4,
          ease: 'easeOut',
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: 'easeIn',
        },
      },
    };

    // Animation variants for menu items
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.1 + i * 0.1,
          duration: 0.5,
          ease: 'easeOut',
        },
      }),
    };

    // Hamburger animation
    const hamburgerVariants = {
      open: {
        rotate: 45,
      },
      closed: {
        rotate: 0,
      },
    };

    // Background blur animation
    const bgVariants = {
      hidden: { backdropFilter: 'blur(0px)' },
      visible: { backdropFilter: 'blur(8px)' },
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full bg-background border-b border-border shadow-sm',
          className
        )}
        {...props}
      >
        {/* Top Navbar - Always Visible */}
        <nav className="flex items-center justify-between px-6 py-5 md:px-8 lg:px-12">
          {/* Logo */}
          <Link
            href={logo?.href || '/'}
            className="text-2xl font-bold text-foreground hover:text-primary transition-colors z-50"
          >
            {logo?.text || 'Your Logo'}
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-accent rounded-lg transition-colors z-50"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isOpen ? 'open' : 'closed'}
              variants={hamburgerVariants}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="w-7 h-7 text-foreground" />
              ) : (
                <Menu className="w-7 h-7 text-foreground" />
              )}
            </motion.div>
          </button>
        </nav>

        {/* Full-Screen Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="fixed inset-0 top-20 left-0 right-0 bg-background z-40 overflow-hidden"
              style={{ height: 'calc(100vh - 80px)' }}
            >
              {/* Background blur effect */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={bgVariants}
                className="absolute inset-0"
              />

              {/* Menu Items */}
              <div className="relative flex flex-col items-center justify-center h-full space-y-8 px-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      className="block text-center text-6xl md:text-7xl lg:text-8xl font-bold text-foreground hover:text-primary transition-colors font-sans"
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.span
                        whileHover={{
                          scale: 1.05,
                          textShadow: '0px 0px 20px rgba(var(--primary-rgb), 0.5)',
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Navbar.displayName = 'Navbar';

export { Navbar };
