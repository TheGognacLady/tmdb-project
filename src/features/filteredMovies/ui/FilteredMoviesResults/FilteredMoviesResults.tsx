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
  onPageChange: (page: number) => void
}

export const FilteredMoviesResults = ({
  sortBy,
  currentPage,
  minRating,
  maxRating,
  onPageChange,
}: FilteredMoviesResultsProps) => {
  const { currentData: data, isFetching, isError } = useGetFilteredMoviesQuery({
    page: currentPage,
    sortBy,
    minRating,
    maxRating,
  })
  const totalPages = Math.min(data?.total_pages ?? 0, TMDB_MAX_PAGE)

  return (
    <section className={styles.results} aria-label="Filtered movies">
      {isError ? (
        <p className={styles.message} role="alert">Failed to load movies.</p>
      ) : isFetching && !data ? (
        <p className={styles.message} role="status">Loading...</p>
      ) : data?.results.length === 0 ? (
        <p className={styles.message}>No movies found.</p>
      ) : (
        <div className={styles.moviesGrid}>
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {!isError && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </section>
  )
}
