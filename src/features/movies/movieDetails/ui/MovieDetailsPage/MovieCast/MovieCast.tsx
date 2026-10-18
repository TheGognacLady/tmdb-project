import type { CastMember } from '@/features/movies/movieDetails/model'
import { MovieCastItem } from './MovieCastItem/MovieCastItem'
import { MovieCastSkeleton } from './MovieCastSkeleton/MovieCastSkeleton'
import pageStyles from '../MovieDetailsPage.module.css'
import styles from './MovieCast.module.css'

type MovieCastProps = {
  cast?: CastMember[]
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

export const MovieCast = ({ cast, isLoading, isError, onRetry }: MovieCastProps) => {
  const leadingCast = cast ? [...cast].sort((first, second) => first.order - second.order).slice(0, 6) : []

  return (
    <section className={styles.section} aria-labelledby="movie-cast-title">
      <h2 className={styles.title} id="movie-cast-title">Cast</h2>
      {isLoading ? (
        <div className={styles.grid} role="status" aria-label="Loading cast">
          {Array.from({ length: 6 }, (_, index) => (
            <MovieCastSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <div className={pageStyles.errorState}>
          <p className={styles.message}>Unable to load cast.</p>
          <button className={pageStyles.retryButton} type="button" onClick={onRetry}>Retry</button>
        </div>
      ) : leadingCast.length === 0 ? (
        <p className={styles.message}>No cast available.</p>
      ) : (
        <div className={styles.grid}>
          {leadingCast.map((actor) => (
            <MovieCastItem key={actor.credit_id} actor={actor} />
          ))}
        </div>
      )}
    </section>
  )
}
