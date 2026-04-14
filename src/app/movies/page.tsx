import { Suspense } from 'react'
import { getMovies, getGenres } from '@/lib/tmdb'
import { MoviesClientShell } from '@/components/MoviesClientShell/MoviesClientShell'
import type { FilterState } from '@/types/tmdb'

interface MoviesPageProps {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams

  const filters: FilterState = {
    query: params['query'] ?? '',
    genre: params['genre'] ? Number(params['genre']) : null,
    sort_by: (params['sort_by'] as FilterState['sort_by']) ?? 'popularity.desc',
    year: params['year'] ? Number(params['year']) : null,
    page: params['page'] ? Number(params['page']) : 1,
  }

  const [moviesData, genres] = await Promise.all([
    getMovies(filters),
    getGenres(),
  ])

  return (
    <div className="container-app py-20">
      <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
        <MoviesClientShell
          genres={genres}
          filters={filters}
          movies={moviesData.results}
          totalPages={moviesData.total_pages}
          totalResults={moviesData.total_results}
        />
      </Suspense>
    </div>
  )
}