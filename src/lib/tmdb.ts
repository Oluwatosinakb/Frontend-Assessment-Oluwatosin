import type {
  Movie,
  MovieDetail,
  Credits,
  Genre,
  PaginatedResponse,
  GenreListResponse,
  MovieListParams,
  FilterState,
} from '@/types/tmdb'

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE_URL =
  process.env.TMDB_BASE_URL ?? 'https://api.themoviedb.org/3'
const IMAGE_BASE =
  process.env.TMDB_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p'
const API_KEY = process.env.TMDB_API_KEY

if (!API_KEY && typeof window === 'undefined') {
  throw new Error('TMDB_API_KEY is not defined in environment variables')
}

// ─── Base Fetcher ─────────────────────────────────────────────────────────────

async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string | number | boolean | undefined> = {},
  cacheOptions:
    | RequestInit['cache']
    | { next: { revalidate: number } } = { next: { revalidate: 3600 } }
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`)

  //  Attach API key (v3 auth)
  url.searchParams.set('api_key', API_KEY!)

  // Always attach language
  url.searchParams.set('language', 'en-US')

  // Attach extra params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })

  // Debug (optional but helpful)
  console.log('Fetching:', url.toString())

  const response = await fetch(url.toString(), {
    ...(typeof cacheOptions === 'string'
      ? { cache: cacheOptions }
      : cacheOptions),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('TMDB ERROR:', errorText)

    throw new Error(
      `TMDB API error: ${response.status} ${response.statusText} — ${endpoint}`
    )
  }

  return response.json() as Promise<T>
}

// ─── Image Helpers ────────────────────────────────────────────────────────────

export function getPosterUrl(
  path: string | null,
  size: 'w185' | 'w342' | 'w500' | 'w780' = 'w342'
): string {
  if (!path) return '/images/poster-fallback.png'
  return `${IMAGE_BASE}/${size}${path}`
}

export function getBackdropUrl(
  path: string | null,
  size: 'w780' | 'w1280' | 'original' = 'w1280'
): string {
  if (!path) return '/images/backdrop-fallback.png'
  return `${IMAGE_BASE}/${size}${path}`
}

export function getProfileUrl(
  path: string | null,
  size: 'w185' | 'w342' = 'w185'
): string {
  if (!path) return '/images/profile-fallback.png'
  return `${IMAGE_BASE}/${size}${path}`
}

// ─── Movies ───────────────────────────────────────────────────────────────────

export async function getPopularMovies(
  page = 1
): Promise<PaginatedResponse<Movie>> {
  return tmdbFetch<PaginatedResponse<Movie>>(
    '/movie/popular',
    { page },
    { next: { revalidate: 3600 } }
  )
}

export async function searchMovies(
  query: string,
  page = 1
): Promise<PaginatedResponse<Movie>> {
  return tmdbFetch<PaginatedResponse<Movie>>(
    '/search/movie',
    { query, page, include_adult: false },
    'no-store'
  )
}

export async function discoverMovies(
  params: MovieListParams | FilterState
): Promise<PaginatedResponse<Movie>> {
  const { page = 1, genre, sort_by = 'popularity.desc', year } = params

  return tmdbFetch<PaginatedResponse<Movie>>(
    '/discover/movie',
    {
      page,
      with_genres: genre ?? undefined,
      sort_by,
      primary_release_year: year ?? undefined,
      include_adult: false,
      'vote_count.gte': 50,
    },
    { next: { revalidate: 3600 } }
  )
}

export async function getMovieDetail(id: number): Promise<MovieDetail> {
  return tmdbFetch<MovieDetail>(
    `/movie/${id}`,
    {},
    { next: { revalidate: 86400 } }
  )
}

export async function getMovieCredits(id: number): Promise<Credits> {
  return tmdbFetch<Credits>(
    `/movie/${id}/credits`,
    {},
    { next: { revalidate: 86400 } }
  )
}

export async function getSimilarMovies(
  id: number,
  page = 1
): Promise<PaginatedResponse<Movie>> {
  return tmdbFetch<PaginatedResponse<Movie>>(
    `/movie/${id}/similar`,
    { page },
    { next: { revalidate: 3600 } }
  )
}

// ─── Genres ───────────────────────────────────────────────────────────────────

export async function getGenres(): Promise<Genre[]> {
  const data = await tmdbFetch<GenreListResponse>(
    '/genre/movie/list',
    {},
    'force-cache'
  )
  return data.genres
}

// ─── Smart Fetcher ─────────────────────────────────────────────────────────

export async function getMovies(
  params: MovieListParams | FilterState
): Promise<PaginatedResponse<Movie>> {
  if (params.query && params.query.trim().length > 0) {
    return searchMovies(params.query, params.page)
  }
  return discoverMovies(params)
}