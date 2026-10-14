import type { MovieDetails } from '@/features/movies/movieDetails/model'
import { MovieRating } from '@/features/movies/ui/MovieRating/MovieRating'
import styles from './MovieInfoGeneral.module.css'

type MovieInfoGeneralProps = {
  movie: MovieDetails
  onBack: () => void
}

export const MovieInfoGeneral = ({ movie, onBack }: MovieInfoGeneralProps) => {
  const releaseYear = movie.release_date?.match(/^\d{4}/)?.[0] ?? '-'
  const runtime = movie.runtime && movie.runtime > 0
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : 'Runtime unavailable'
  const overview = movie.overview?.trim() || 'No overview available.'

  return (
    <div className={styles.general}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>{movie.title}</h1>
          <button className={styles.backButton} type="button" onClick={onBack}>Back</button>
        </div>
        <div className={styles.meta}>
          <span className={styles.metaItem}>Release year: {releaseYear}</span>
          <MovieRating rating={movie.vote_average} className={styles.detailsRating} />
          <span className={styles.metaItem}>Runtime: {runtime}</span>
        </div>
      </header>

      <p className={styles.overview}>{overview}</p>
    </div>
  )
}
