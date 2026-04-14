import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMovieDetail, getMovieCredits, getSimilarMovies, getBackdropUrl, getPosterUrl } from '@/lib/tmdb'
import { MovieCard } from '@/components/MovieCard/MovieCard'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const movie = await getMovieDetail(Number(id))
    return {
      title: movie.title,
      description: movie.overview,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: [{ url: getPosterUrl(movie.poster_path, 'w500') }],
      },
    }
  } catch {
    return { title: 'Movie Not Found' }
  }
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params

  let movie, credits, similar
  try {
    ;[movie, credits, similar] = await Promise.all([
      getMovieDetail(Number(id)),
      getMovieCredits(Number(id)),
      getSimilarMovies(Number(id)),
    ])
  } catch {
    notFound()
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'w1280')
  const posterUrl = getPosterUrl(movie.poster_path, 'w500')
  const director = credits.crew.find(c => c.job === 'Director')
  const topCast = credits.cast.slice(0, 6)
  const similarMovies = similar.results.slice(0, 6)

  const hours = movie.runtime ? Math.floor(movie.runtime / 60) : 0
  const mins = movie.runtime ? movie.runtime % 60 : 0

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Backdrop hero */}
      <div style={{ position: 'relative', height: '70vh', minHeight: '500px' }}>
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          priority
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #0A0A0F 0%, #0A0A0F 5%, rgba(10,10,15,0.4) 50%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, #0A0A0F 0%, transparent 50%)',
        }} />
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}
        className="!px-4 sm:!px-6 lg:!px-12 xl:!px-[48px]"
      >

        {/* ── DESKTOP layout (md and above) ── */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: '260px 1fr',
            gap: '48px',
            marginTop: '-280px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Poster */}
          <div style={{ flexShrink: 0 }}>
            <div style={{
              position: 'relative', borderRadius: '16px', overflow: 'hidden',
              aspectRatio: '2/3', boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
            }}>
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="260px"
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div style={{ paddingTop: '160px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <DetailsContent movie={movie} director={director} hours={hours} mins={mins} />
          </div>
        </div>

        {/* ── MOBILE layout (below md) ── */}
        <div className="md:hidden" style={{ position: 'relative', zIndex: 10, marginTop: '-120px' }}>
          {/* Poster + title side by side on mobile */}
          <div className="flex gap-4 items-end mb-5">
            <div style={{
              flexShrink: 0,
              width: '110px',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              aspectRatio: '2/3',
              boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
            }}>
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="110px"
                priority
              />
            </div>

            {/* Title + quick meta */}
            <div className="flex flex-col gap-2 pb-1">
              <h1 style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(1.8rem, 7vw, 2.5rem)',
                letterSpacing: '0.03em',
                color: '#F0F0F5',
                lineHeight: 1,
              }}>
                {movie.title}
              </h1>

              {/* Rating */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                background: '#16161F', border: '1px solid #ffffff0f',
                borderRadius: '8px', padding: '4px 10px', width: 'fit-content',
              }}>
                <span style={{ color: '#F5A623' }}>★</span>
                <span style={{ color: '#F0F0F5', fontWeight: 700, fontSize: '0.9rem' }}>
                  {movie.vote_average.toFixed(1)}
                </span>
                <span style={{ color: '#8B8B9E', fontSize: '0.7rem' }}>
                  ({movie.vote_count.toLocaleString()})
                </span>
              </div>

              {/* Year · Runtime */}
              <div className="flex items-center gap-3 flex-wrap">
                <span style={{ color: '#8B8B9E', fontSize: '0.8rem' }}>
                  {movie.release_date?.slice(0, 4)}
                </span>
                {movie.runtime ? (
                  <span style={{ color: '#8B8B9E', fontSize: '0.8rem' }}>
                    {hours}h {mins}m
                  </span>
                ) : null}
                <span style={{
                  background: '#E6394620', color: '#E63946',
                  border: '1px solid #E6394640', borderRadius: '6px',
                  padding: '2px 8px', fontSize: '0.7rem', fontWeight: 600,
                }}>
                  {movie.status}
                </span>
              </div>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-3">
            <Link href="/movies" style={{ color: '#8B8B9E', textDecoration: 'none' }}>Movies</Link>
            <span style={{ color: '#55556A' }}>›</span>
            <span style={{ color: '#F0F0F5' }} className="truncate">{movie.title}</span>
          </div>

          {/* Tagline */}
          {movie.tagline && (
            <p style={{ color: '#8B8B9E', fontSize: '0.875rem', fontStyle: 'italic', marginBottom: '12px' }}>
              "{movie.tagline}"
            </p>
          )}

          {/* Genres */}
          <div className="flex gap-2 flex-wrap mb-3">
            {movie.genres.map(g => (
              <span key={g.id} style={{
                background: '#16161F', border: '1px solid #ffffff0f',
                borderRadius: '6px', padding: '3px 10px',
                color: '#F0F0F5', fontSize: '0.75rem',
              }}>
                {g.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p style={{
            color: '#9CA3AF', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '12px',
          }}>
            {movie.overview}
          </p>

          {/* Director */}
          {director && (
            <div style={{ fontSize: '0.825rem' }}>
              <span style={{ color: '#8B8B9E' }}>Director: </span>
              <span style={{ color: '#F0F0F5', fontWeight: 600 }}>{director.name}</span>
            </div>
          )}
        </div>

        {/* ── CAST (shared, responsive grid) ── */}
        {topCast.length > 0 && (
          <div style={{ marginTop: '64px' }}>
            <h2 style={{
              fontFamily: 'var(--font-bebas)', fontSize: '1.8rem',
              letterSpacing: '0.05em', color: '#F0F0F5', marginBottom: '24px',
            }}>
              Cast
            </h2>
            <div className="grid gap-4"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}
            >
              {topCast.map(member => (
                <div key={member.id} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: '#16161F', margin: '0 auto 8px',
                    overflow: 'hidden', border: '2px solid #ffffff0f',
                  }}>
                    {member.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                        alt={member.name}
                        width={72}
                        height={72}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#55556A', fontSize: '1.5rem',
                      }}></div>
                    )}
                  </div>
                  <p style={{ color: '#F0F0F5', fontSize: '0.72rem', fontWeight: 600 }}>{member.name}</p>
                  <p style={{ color: '#8B8B9E', fontSize: '0.68rem', marginTop: '2px' }}>{member.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SIMILAR MOVIES (shared, responsive grid) ── */}
        {similarMovies.length > 0 && (
          <div style={{ marginTop: '64px' }}>
            <h2 style={{
              fontFamily: 'var(--font-bebas)', fontSize: '1.8rem',
              letterSpacing: '0.05em', color: '#F0F0F5', marginBottom: '24px',
            }}>
              More Like This
            </h2>
            <div className="grid gap-4"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}
            >
              {similarMovies.map(m => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Extracted desktop info block to avoid duplication ──────────────────────
function DetailsContent({ movie, director, hours, mins }: {
  movie: Awaited<ReturnType<typeof getMovieDetail>>
  director: { name: string } | undefined
  hours: number
  mins: number
}) {
  return (
    <>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
        <Link href="/movies" style={{ color: '#8B8B9E', textDecoration: 'none' }}>Movies</Link>
        <span style={{ color: '#55556A' }}>›</span>
        <span style={{ color: '#F0F0F5' }}>{movie.title}</span>
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: 'var(--font-bebas)',
        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
        letterSpacing: '0.03em',
        color: '#F0F0F5',
        lineHeight: 1,
      }}>
        {movie.title}
      </h1>

      {/* Tagline */}
      {movie.tagline && (
        <p style={{ color: '#8B8B9E', fontSize: '1rem', fontStyle: 'italic' }}>
          "{movie.tagline}"
        </p>
      )}

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: '#16161F', border: '1px solid #ffffff0f',
          borderRadius: '8px', padding: '6px 12px',
        }}>
          <span style={{ color: '#F5A623' }}>★</span>
          <span style={{ color: '#F0F0F5', fontWeight: 700, fontSize: '1rem' }}>
            {movie.vote_average.toFixed(1)}
          </span>
          <span style={{ color: '#8B8B9E', fontSize: '0.75rem' }}>
            ({movie.vote_count.toLocaleString()})
          </span>
        </div>
        <span style={{ color: '#8B8B9E', fontSize: '0.875rem' }}>
          {movie.release_date?.slice(0, 4)}
        </span>
        {movie.runtime ? (
          <span style={{ color: '#8B8B9E', fontSize: '0.875rem' }}>{hours}h {mins}m</span>
        ) : null}
        <span style={{
          background: '#E6394620', color: '#E63946',
          border: '1px solid #E6394640', borderRadius: '6px',
          padding: '3px 10px', fontSize: '0.75rem', fontWeight: 600,
        }}>
          {movie.status}
        </span>
      </div>

      {/* Genres */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {movie.genres.map(g => (
          <span key={g.id} style={{
            background: '#16161F', border: '1px solid #ffffff0f',
            borderRadius: '6px', padding: '4px 12px',
            color: '#F0F0F5', fontSize: '0.8rem',
          }}>
            {g.name}
          </span>
        ))}
      </div>

      {/* Overview */}
      <p style={{ color: '#9CA3AF', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '600px' }}>
        {movie.overview}
      </p>

      {/* Director */}
      {director && (
        <div style={{ fontSize: '0.875rem' }}>
          <span style={{ color: '#8B8B9E' }}>Director: </span>
          <span style={{ color: '#F0F0F5', fontWeight: 600 }}>{director.name}</span>
        </div>
      )}
    </>
  )
}