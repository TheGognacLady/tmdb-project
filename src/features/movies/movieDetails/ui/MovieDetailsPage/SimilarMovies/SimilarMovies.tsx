import type { Movie } from '@/features/movies/model'
import { MovieCard } from '@/features/movies/ui/MovieCard/MovieCard'
import { MovieCardSkeleton } from '@/features/movies/ui/MovieCardSkeleton/MovieCardSkeleton'
import pageStyles from '../MovieDetailsPage.module.css'
import styles from './SimilarMovies.module.css'

type SimilarMoviesProps = {
  movies?: Movie[]
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

export const SimilarMovies = ({ movies, isLoading, isError, onRetry }: SimilarMoviesProps) => {
  const visibleMovies = movies?.slice(0, 6) ?? []

  return (
    <section className={styles.section} aria-labelledby="similar-movies-title">
      <h2 className={styles.title} id="similar-movies-title">Similar Movies</h2>
      {isLoading ? (
        <div className={styles.grid} role="status" aria-label="Loading similar movies">
          {Array.from({ length: 6 }, (_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <div className={pageStyles.errorState}>
          <p className={styles.message}>Unable to load similar movies.</p>
          <button className={pageStyles.retryButton} type="button" onClick={onRetry}>Retry</button>
        </div>
      ) : visibleMovies.length === 0 ? (
        <p className={styles.message}>No similar movies available.</p>
      ) : (
        <div className={styles.grid}>
          {visibleMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
    </section>
  )
}
