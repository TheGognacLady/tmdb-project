import { getPaginationPages } from './getPaginationPages'
import styles from './Pagination.module.css'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = getPaginationPages(currentPage, totalPages)

  if (pages.length === 0) {
    return null
  }


  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {pages.map((page, index) =>
        page === '...' ? (
          <span className={styles.ellipsis} key={`ellipsis-${index}`} aria-hidden="true">
            ...
          </span>
        ) : (
          <button
            className={`${styles.pageButton} ${page === currentPage ? styles.pageButtonActive : ''}`}
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ),
      )}
    </nav>
  )
}
