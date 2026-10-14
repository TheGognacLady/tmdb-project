import { useEffect } from 'react'
import { TMDB_MAX_PAGE } from '@/common/api/tmdb/tmdb.constants'
import { Pagination } from '@/common/components'
import { MovieCard } from '@/features/movies/ui'
import { useGetSearchedMoviesQuery } from '@/features/search/api'
import styles from './SearchResults.module.css'

type SearchResultsProps = {
  query: string
  page: number
  onPageChange: (page: number, replace?: boolean) => void
}

export const SearchResults = ({ query, page, onPageChange }: SearchResultsProps) => {
  const { currentData: data, isFetching, isError, refetch } = useGetSearchedMoviesQuery(
    { query, page },
    { skip: !query },
  )
  const totalPages = Math.min(data?.total_pages ?? 0, TMDB_MAX_PAGE)
  const isPageOutOfRange = data !== undefined && totalPages > 0 && page > totalPages

  useEffect(() => {
    if (isPageOutOfRange) {
      onPageChange(1, true)
    }
  }, [isPageOutOfRange, onPageChange])

  return (
    <section className={styles.results} aria-label="Search results">
      <h2 className={styles.resultsTitle}>Results for "{query}"</h2>
      {isError ? (
        <div className={styles.errorState}>
          <p className={styles.message} role="alert">Unable to load search results. Please try again later.</p>
          <button
            className={styles.retryButton}
            type="button"
            onClick={() => { void refetch() }}
            disabled={isFetching}
          >
            {isFetching ? 'Retrying...' : 'Retry'}
          </button>
        </div>
      ) : !data || isPageOutOfRange ? (
        <p className={styles.message} role="status">Loading movies...</p>
      ) : data.results.length === 0 && data.total_pages === 0 ? (
        <p className={styles.message} role="status">No matches found for "{query}"</p>
      ) : data.results.length === 0 ? (
        <p className={styles.message} role="status">No movies found on this page.</p>
      ) : (
        <>
          <div className={styles.moviesGrid} aria-busy={isFetching}>
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </section>
  )
}
