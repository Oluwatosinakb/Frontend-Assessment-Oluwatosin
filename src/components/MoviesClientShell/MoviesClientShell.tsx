'use client'

import { SearchBar } from '@/components/SearchBar/SearchBar'
import { FilterBar } from '@/components/FilterBar/FilterBar'
import { MovieCard } from '@/components/MovieCard/MovieCard'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Pagination } from '@/components/Pagination/Pagination'
import { useSearchFilters } from '@/hooks/useSearchFilters'
import type { Movie, Genre, FilterState } from '@/types/tmdb'

interface MoviesClientShellProps {
  genres: Genre[]
  filters: FilterState
  movies: Movie[]
  totalPages: number
  totalResults: number
}

export function MoviesClientShell({
  genres, filters, movies, totalPages, totalResults

}: MoviesClientShellProps) {
  const { setQuery, setGenre, setSort, setPage, resetFilters } = useSearchFilters()

  return (
    <div>
      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        flexWrap: 'wrap', marginBottom: '32px',
      }}>
        <SearchBar value={filters.query} onChange={setQuery} />
        <FilterBar
          genres={genres}
          selectedGenre={filters.genre}
          selectedSort={filters.sort_by}
          onGenreChange={setGenre}
          onSortChange={setSort}
        />
      </div>

      {/* Grid or empty state */}
      {movies.length === 0 ? (
        <EmptyState query={filters.query} onReset={resetFilters} />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '20px',
          marginBottom: '48px',
        }}>
          {movies.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} priority={i < 8} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={filters.page}
          totalPages={Math.min(totalPages, 500)}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}