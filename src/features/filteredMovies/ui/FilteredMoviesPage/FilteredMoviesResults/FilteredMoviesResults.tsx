import { TMDB_MAX_PAGE } from '@/common/api/tmdb/tmdb.constants'
import { Pagination } from '@/common/components'
import { useGetFilteredMoviesQuery } from '@/features/filteredMovies/api'
import type { FilteredMoviesSort } from '@/features/filteredMovies/model'
import { MovieCard } from '@/features/movies/ui'
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
  const { data, currentData, isFetching, isError } = useGetFilteredMoviesQuery(
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
      {/* TODO: Revisit retained data when adding skeleton and loading states. */}
      {isRatingPending && visibleData && (
        <p className={styles.message} role="status">Updating filters. Showing previous results.</p>
      )}
      {visibleData?.results.length === 0 ? (
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
        <p className={styles.message} role="status">Loading...</p>
      ) : isError ? (
        <p className={styles.message}>Movies are unavailable.</p>
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
