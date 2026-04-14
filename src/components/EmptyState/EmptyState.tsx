interface EmptyStateProps {
  query?: string
  onReset: () => void
}

export function EmptyState({ query, onReset }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '80px 20px', textAlign: 'center', gap: '16px',
    }}>
      <span style={{ fontSize: '3rem' }}>🎬</span>
      <h3 style={{ color: '#F0F0F5', fontSize: '1.25rem', fontWeight: 600 }}>
        No movies found
      </h3>
      <p style={{ color: '#8B8B9E', fontSize: '0.875rem', maxWidth: '300px' }}>
        {query
          ? `We couldn't find any results for "${query}". Try a different search term or clear your filters.`
          : 'No movies match your current filters. Try adjusting them.'}
      </p>
      <button
        onClick={onReset}
        style={{
          background: '#E63946', color: 'white', border: 'none', borderRadius: '8px',
          padding: '10px 24px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
          marginTop: '8px',
        }}
      >
        Clear Filters
      </button>
    </div>
  )
}