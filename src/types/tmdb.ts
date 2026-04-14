// ─── Image & Config ───────────────────────────────────────────────────────────

export type ImageSize =
  | 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original'

export type BackdropSize =
  | 'w300' | 'w780' | 'w1280' | 'original'

// ─── Genre ────────────────────────────────────────────────────────────────────

export interface Genre {
  id: number
  name: string
}

// ─── Movie (list item) ────────────────────────────────────────────────────────

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
  adult: boolean
  original_language: string
  original_title: string
}

// ─── Movie Detail (single movie full data) ────────────────────────────────────

export interface MovieDetail extends Omit<Movie, 'genre_ids'> {
  genres: Genre[]
  runtime: number | null
  status: string
  tagline: string | null
  budget: number
  revenue: number
  homepage: string | null
  imdb_id: string | null
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  iso_639_1: string
  name: string
  english_name: string
}

// ─── Credits ──────────────────────────────────────────────────────────────────

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
  known_for_department: string
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface Credits {
  cast: CastMember[]
  crew: CrewMember[]
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface GenreListResponse {
  genres: Genre[]
}

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface MovieListParams {
  page?: number
  query?: string
  genre?: number | null
  sort_by?: SortOption
  year?: number | null
}

export type SortOption =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'vote_average.desc'
  | 'vote_average.asc'
  | 'release_date.desc'
  | 'release_date.asc'
  | 'revenue.desc'

// ─── UI State Types ───────────────────────────────────────────────────────────

export interface FilterState {
  query: string
  genre: number | null
  sort_by: SortOption
  year: number | null
  page: number
}