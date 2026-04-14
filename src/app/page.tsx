import { Suspense } from 'react'
import { getMovies, getGenres } from '@/lib/tmdb'
import { MoviesClientShell } from '@/components/MoviesClientShell/MoviesClientShell'
import type { FilterState } from '@/types/tmdb'

interface MoviesPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = searchParams 

  const filters: FilterState = {
    query: (params['query'] as string) ?? '',
    genre: params['genre'] ? Number(params['genre']) : null,
    sort_by:
      (params['sort_by'] as FilterState['sort_by']) ??
      'popularity.desc',
    year: params['year'] ? Number(params['year']) : null,
    page: params['page'] ? Number(params['page']) : 1,
  }

  const [moviesData, genres] = await Promise.all([
    getMovies(filters),
    getGenres(),
  ])

  console.log('Movies fetched:', moviesData)
console.log('Genres:', genres)

  return (
  <div style={{ color: 'white', padding: '40px' }}>
    PAGE IS RENDERING
  </div>
)
}