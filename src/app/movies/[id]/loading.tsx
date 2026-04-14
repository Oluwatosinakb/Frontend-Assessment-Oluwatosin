export default function Loading() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Backdrop skeleton */}
      <div style={{
        height: '70vh', minHeight: '500px',
        background: 'linear-gradient(90deg, #16161F 25%, #1E1E2A 50%, #16161F 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.6s ease-in-out infinite',
      }} />
      <div style={{ maxWidth: '1280px', margin: '-280px auto 0', padding: '0 48px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '48px' }}>
          <div style={{
            aspectRatio: '2/3', borderRadius: '16px',
            background: 'linear-gradient(90deg, #16161F 25%, #1E1E2A 50%, #16161F 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.6s ease-in-out infinite',
          }} />
          <div style={{ paddingTop: '200px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[300, 200, 150].map((w, i) => (
              <div key={i} style={{
                height: i === 0 ? '48px' : '16px', width: `${w}px`, borderRadius: '8px',
                background: 'linear-gradient(90deg, #16161F 25%, #1E1E2A 50%, #16161F 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.6s ease-in-out infinite',
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}