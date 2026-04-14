'use client'
import Link from 'next/link'
import Image from 'next/image'
import { getPosterUrl } from '@/lib/tmdb'
import type { Movie } from '@/types/tmdb'

interface MovieCardProps {
  movie: Movie
  priority?: boolean
}

export function MovieCard({ movie, priority = false }: MovieCardProps) {
const posterUrl = movie.poster_path
  ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
  : '/images/poster-fallback.png'
    const year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'

  return (
    <Link href={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
      <article
        style={{
          background: 'var(--color-card)',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(0,0,0,0.6)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
        }}
      >
        {/* Poster */}
        <div style={{ position: 'relative', aspectRatio: '2/3', width: '100%', background: '#1E1E2A' }}>
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: 'cover' }}
            priority={priority}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/poster-fallback.png'
            }}
          />

          {/* Rating badge */}
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(4px)',
            borderRadius: '6px',
            padding: '3px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <span style={{ color: '#F5A623', fontSize: '11px' }}>★</span>
            <span style={{ color: '#F0F0F5', fontSize: '12px', fontWeight: 600 }}>{rating}</span>
          </div>

          {/* Hover overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)',
            opacity: 0,
            transition: 'opacity 0.25s ease',
          }}
            className="card-overlay"
          />
        </div>

        {/* Info */}
        <div style={{ padding: '12px 14px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <h3 style={{
            color: '#F0F0F5',
            fontSize: '0.875rem',
            fontWeight: 600,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {movie.title}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
            <span style={{ color: '#8B8B9E', fontSize: '0.75rem' }}>{year}</span>
            {movie.original_language && (
              <span style={{
                color: '#8B8B9E',
                fontSize: '0.7rem',
                background: '#ffffff0f',
                padding: '2px 6px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {movie.original_language}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}