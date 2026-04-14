'use client'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages: (number | '...')[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push('...')
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
  }

  const btnStyle = (active: boolean, disabled = false) => ({
    background: active ? '#E63946' : '#16161F',
    color: active ? 'white' : disabled ? '#55556A' : '#8B8B9E',
    border: '1px solid',
    borderColor: active ? '#E63946' : '#ffffff0f',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: '0.875rem',
    fontWeight: active ? 600 : 400,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    minWidth: '40px',
  })

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={btnStyle(false, currentPage === 1)}
      >
        ← Prev
      </button>

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} style={{ color: '#55556A', padding: '0 4px' }}>…</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            style={btnStyle(page === currentPage)}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={btnStyle(false, currentPage === totalPages)}
      >
        Next →
      </button>
    </div>
  )
}