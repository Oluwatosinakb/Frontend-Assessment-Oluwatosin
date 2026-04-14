'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import type { FilterState, SortOption } from '@/types/tmdb'

export function useSearchFilters(): {
    filters: FilterState
    setQuery: (q: string) => void
    setGenre: (g: number | null) => void
    setSort: (s: SortOption) => void
    setYear: (y: number | null) => void
    setPage: (p: number) => void
    resetFilters: () => void
} {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const filters: FilterState = {
        query: searchParams.get('query') ?? '',
        genre: searchParams.get('genre') ? Number(searchParams.get('genre')) : null,
        sort_by: (searchParams.get('sort_by') as SortOption) ?? 'popularity.desc',
        year: searchParams.get('year') ? Number(searchParams.get('year')) : null,
        page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    }

    const updateParams = useCallback(
        (updates: Partial<Record<string, string | null>>) => {
            const params = new URLSearchParams(searchParams.toString())
            Object.entries(updates).forEach(([key, val]) => {
                if (val === null || val === undefined || val === '') {
                    params.delete(key)
                } else {
                    params.set(key, val)
                }
            })
            if (!('page' in updates)) params.set('page', '1')
            router.push(`${pathname}?${params.toString()}`, { scroll: false })
        },
        [router, pathname, searchParams]
    )

    return {
        filters,
        setQuery: (q) => updateParams({ query: q }),
        setGenre: (g) => updateParams({ genre: g !== null ? String(g) : null }),
        setSort: (s) => updateParams({ sort_by: s }),
        setYear: (y) => updateParams({ year: y !== null ? String(y) : null }),
        setPage: (p) => updateParams({ page: String(p) }),
        resetFilters: () => router.push(pathname),
    }
}