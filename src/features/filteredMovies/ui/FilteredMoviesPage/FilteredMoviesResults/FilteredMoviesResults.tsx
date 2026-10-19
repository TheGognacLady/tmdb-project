import { TMDB_MAX_PAGE } from '@/common/api/tmdb/tmdb.constants'
import { Pagination } from '@/common/components'
import { useGetFilteredMoviesQuery } from '@/features/filteredMovies/api'
import type { FilteredMoviesSort } from '@/features/filteredMovies/model'
import { MovieCard } from '@/features/movies/ui'
import { MovieCardSkeleton } from '@/features/movies/ui/MovieCardSkeleton/MovieCardSkeleton'
import styles from './FilteredMoviesResults.module.css'

type FilteredMoviesResultsProps = {
  sortBy: FilteredMoviesSort
  currentPage: number
  minRating: number
  maxRating: number
  isRatingPending: boolean
  genreIds: number[]
  onPageChange: (page: number) => void
}

export const FilteredMoviesResults = ({
  sortBy,
  currentPage,
  minRating,
  maxRating,
  isRatingPending,
  genreIds,
  onPageChange,
}: FilteredMoviesResultsProps) => {
  const { data, currentData, isFetching, isError, refetch } = useGetFilteredMoviesQuery(
    {
      page: currentPage,
      sortBy,
      minRating,
      maxRating,
      genreIds,
    },
    { skip: isRatingPending },
  )
  const visibleData = isRatingPending ? data : currentData
  const totalPages = Math.min(visibleData?.total_pages ?? 0, TMDB_MAX_PAGE)

  return (
    <section className={styles.results} aria-label="Filtered movies">
      {isRatingPending && visibleData && (
        <p className={styles.message} role="status">Updating filters. Showing previous results.</p>
      )}
      {isError && !isRatingPending && (
        <div className={styles.errorState}>
          <p className={styles.message}>
            {visibleData ? 'Showing previously loaded results.' : 'Movies are unavailable.'}
          </p>
          <button
            className={styles.retryButton}
            type="button"
            onClick={() => { void refetch() }}
            disabled={isFetching}
          >
            {isFetching ? 'Retrying...' : 'Retry'}
          </button>
        </div>
      )}
      {!visibleData && isError && !isRatingPending ? null : visibleData?.results.length === 0 ? (
        <p className={styles.message}>No movies found.</p>
      ) : visibleData ? (
        <div className={styles.moviesGrid} aria-busy={isFetching || isRatingPending}>
          {visibleData.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : isRatingPending ? (
        <p className={styles.message} role="status">Updating filters...</p>
      ) : isFetching ? (
        <div className={styles.moviesGrid} role="status" aria-label="Loading movies">
          {Array.from({ length: 20 }, (_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <p className={styles.message} role="status">Loading...</p>
      )}

      {visibleData && !isRatingPending && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </section>
  )
}
