import type { CastMember } from '@/features/movies/movieDetails/model'
import { MovieCastItem } from './MovieCastItem/MovieCastItem'
import styles from './MovieCast.module.css'

type MovieCastProps = {
  cast?: CastMember[]
  isLoading: boolean
  isError: boolean
}

export const MovieCast = ({ cast, isLoading, isError }: MovieCastProps) => {
  const leadingCast = cast ? [...cast].sort((first, second) => first.order - second.order).slice(0, 6) : []

  return (
    <section className={styles.section} aria-labelledby="movie-cast-title">
      <h2 className={styles.title} id="movie-cast-title">Cast</h2>
      {isLoading ? (
        <p className={styles.message} role="status">Loading cast...</p>
      ) : isError ? (
        <p className={styles.message}>Unable to load cast.</p>
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
