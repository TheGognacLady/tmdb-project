import type { Movie } from '@/features/movies/model'
import { MovieCard } from '@/features/movies/ui/MovieCard/MovieCard'
import styles from './SimilarMovies.module.css'

type SimilarMoviesProps = {
  movies?: Movie[]
  isLoading: boolean
  isError: boolean
}

export const SimilarMovies = ({ movies, isLoading, isError }: SimilarMoviesProps) => {
  const visibleMovies = movies?.slice(0, 6) ?? []

  return (
    <section className={styles.section} aria-labelledby="similar-movies-title">
      <h2 className={styles.title} id="similar-movies-title">Similar Movies</h2>
      {isLoading ? (
        <p className={styles.message} role="status">Loading similar movies...</p>
      ) : isError ? (
        <p className={styles.message}>Unable to load similar movies.</p>
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
