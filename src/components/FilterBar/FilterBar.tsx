'use client'

import type { Genre, SortOption } from '@/types/tmdb'

interface FilterBarProps {
  genres: Genre[]
  selectedGenre: number | null
  selectedSort: SortOption
  onGenreChange: (genre: number | null) => void
  onSortChange: (sort: SortOption) => void
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Popularity', value: 'popularity.desc' },
  { label: 'Rating', value: 'vote_average.desc' },
  { label: 'Newest', value: 'release_date.desc' },
  { label: 'Oldest', value: 'release_date.asc' },
]

const selectStyle = {
  background: 'var(--color-card)',
  border: '1px solid #ffffff0f',
  borderRadius: '8px',
  padding: '8px 12px',
  color: '#F0F0F5',
  fontSize: '0.8rem',
  outline: 'none',
  cursor: 'pointer',
  minWidth: '130px',
}

export function FilterBar({ genres, selectedGenre, selectedSort, onGenreChange, onSortChange }: FilterBarProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      {/* Genre filter */}
      <select
        value={selectedGenre ?? ''}
        onChange={e => onGenreChange(e.target.value ? Number(e.target.value) : null)}
        style={selectStyle}
        aria-label="Filter by genre"
      >
        <option value="">All Genres</option>
        {genres.map(g => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>

      {/* Sort filter */}
      <select
        value={selectedSort}
        onChange={e => onSortChange(e.target.value as SortOption)}
        style={selectStyle}
        aria-label="Sort by"
      >
        {SORT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}