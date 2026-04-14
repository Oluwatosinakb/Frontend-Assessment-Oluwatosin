'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { clsx } from 'clsx'

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0A0A0F]/95 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-gradient-to-b from-black/60 to-transparent py-5'
      )}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/movies" className="flex items-center gap-1 group">
          <span style={{ color: '#E63946', fontSize: '1.75rem', fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em' }}
            className="group-hover:opacity-80 transition-opacity">
            CINE
          </span>
          <span style={{ color: '#F0F0F5', fontSize: '1.75rem', fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em' }}>
            SCOPE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link
            href="/movies"
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              color: pathname === '/movies' || pathname === '/' ? '#ffffff' : '#8B8B9E',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            Movies
          </Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#111118', borderTop: '1px solid #ffffff0f', padding: '1rem 1.5rem' }}>
          <Link
            href="/movies"
            style={{ display: 'block', padding: '0.75rem 0', fontSize: '0.875rem', color: '#8B8B9E', textDecoration: 'none' }}
            onClick={() => setMenuOpen(false)}
          >
            Movies
          </Link>
        </div>
      )}
    </header>
  )
}