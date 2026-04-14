export function CardSkeleton() {
  return (
    <div style={{
      background: 'var(--color-card)',
      borderRadius: '12px',
      overflow: 'hidden',
    }}>
      {/* Poster skeleton */}
      <div style={{
        aspectRatio: '2/3',
        width: '100%',
        background: 'linear-gradient(90deg, #1E1E2A 25%, #2A2A3A 50%, #1E1E2A 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.6s ease-in-out infinite',
      }} />

      {/* Text skeleton */}
      <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          height: '14px',
          borderRadius: '4px',
          width: '85%',
          background: 'linear-gradient(90deg, #1E1E2A 25%, #2A2A3A 50%, #1E1E2A 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.6s ease-in-out infinite',
        }} />
        <div style={{
          height: '12px',
          borderRadius: '4px',
          width: '40%',
          background: 'linear-gradient(90deg, #1E1E2A 25%, #2A2A3A 50%, #1E1E2A 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.6s ease-in-out infinite 0.2s',
        }} />
      </div>
    </div>
  )
}

export function CardSkeletonGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '20px',
    }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}