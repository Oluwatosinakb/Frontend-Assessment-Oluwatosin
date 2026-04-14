'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function MovieDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container-app py-20 flex flex-col items-center gap-4">
      <h2 className="text-2xl text-[var(--color-text-primary)]">
        Failed to load movie
      </h2>
      <p className="text-[var(--color-text-secondary)]">
        {error.message || 'This movie could not be found'}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-2 bg-[var(--color-accent)] text-white rounded-lg"
        >
          Try again
        </button>
        <Link href="/movies" className="px-6 py-2 border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-lg">
          Back to Movies
        </Link>
      </div>
    </div>
  )
}