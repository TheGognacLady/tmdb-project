import { Link } from 'react-router-dom'
import { getMovieDetailsPath } from '@/common/routing/paths'
import type { Movie } from '@/features/movies/model'
import styles from './MovieCard.module.css'

type MovieCardProps = {
  movie: Movie
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const detailsPath = getMovieDetailsPath(movie.id)
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
    : null
  const rating = movie.vote_average.toFixed(1)
  const ratingTone = movie.vote_average > 7
    ? styles.ratingPositive
    : movie.vote_average >= 5
      ? styles.ratingNeutral
      : styles.ratingNegative

  return (
    <article className={styles.card}>
      <div className={styles.posterFrame}>
        <Link className={styles.posterLink} to={detailsPath}>
          {posterUrl ? (
            <img className={styles.poster} src={posterUrl} alt={`${movie.title} poster`} />
          ) : (
            <span className={styles.posterFallback}>No poster</span>
          )}
          <span className={`${styles.rating} ${ratingTone}`} aria-label={`Rating: ${rating}`}>
            {rating}
          </span>
        </Link>
        <button className={styles.favoriteButton} type="button" aria-label="Add to favorites">
          <svg className={styles.favoriteIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
          </svg>
        </button>
      </div>
      <Link className={styles.titleLink} to={detailsPath}>
        <h3 className={styles.title}>{movie.title}</h3>
      </Link>
    </article>
  )
}
