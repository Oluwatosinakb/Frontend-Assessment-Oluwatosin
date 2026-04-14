'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search movies...' }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value)
  const debounced = useDebounce(localValue, 300)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (debounced !== value) {
      onChange(debounced)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
      {/* Search icon */}
      <svg
        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8B8B9E' }}
        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        type="text"
        value={localValue}
        onChange={e => setLocalValue(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'var(--color-card)',
          border: '1px solid #ffffff0f',
          borderRadius: '10px',
          padding: '10px 14px 10px 42px',
          color: '#F0F0F5',
          fontSize: '0.875rem',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = '#E63946')}
        onBlur={e => (e.currentTarget.style.borderColor = '#ffffff0f')}
      />

      {/* Clear button */}
      {localValue && (
        <button
          onClick={() => { setLocalValue(''); onChange('') }}
          style={{
            position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer', color: '#8B8B9E', padding: '2px',
          }}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}