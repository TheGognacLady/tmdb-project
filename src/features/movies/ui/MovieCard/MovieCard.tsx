import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/model/hooks'
import { getMovieDetailsPath } from '@/common/routing/paths'
import { selectIsFavorite, toggleFavorite } from '@/features/favorites/model'
import type { FavoriteMovie } from '@/features/favorites/model'
import type { Movie } from '@/features/movies/model'
import { MovieRating } from '../MovieRating/MovieRating'
import styles from './MovieCard.module.css'

type MovieCardProps = {
  movie: Movie | FavoriteMovie
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const dispatch = useAppDispatch()
  const isFavorite = useAppSelector((state) => selectIsFavorite(state, movie.id))
  const detailsPath = getMovieDetailsPath(movie.id)
  const detailsState = { movieId: movie.id, movieTitle: movie.title }
  const posterUrl = 'posterUrl' in movie
    ? movie.posterUrl
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
      : null
  const voteAverage = 'voteAverage' in movie ? movie.voteAverage : movie.vote_average
  const favoriteLabel = isFavorite ? 'Remove from favorites' : 'Add to favorites'
  const favoriteMovie: FavoriteMovie = {
    id: movie.id,
    title: movie.title,
    posterUrl,
    voteAverage,
  }

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(favoriteMovie))
  }

  return (
    <article className={styles.card}>
      <div className={styles.posterFrame}>
        <Link className={styles.posterLink} to={detailsPath} state={detailsState}>
          {posterUrl ? (
            <img className={styles.poster} src={posterUrl} alt={`${movie.title} poster`} />
          ) : (
            <span className={styles.posterFallback}>No poster</span>
          )}
          <MovieRating rating={voteAverage} className={styles.cardRating} />
        </Link>
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteButtonVisible : ''}`}
          type="button"
          onClick={handleFavoriteClick}
          aria-pressed={isFavorite}
          aria-label={favoriteLabel}
          title={favoriteLabel}
        >
          <svg
            className={`${styles.favoriteIcon} ${isFavorite ? styles.favoriteIconActive : ''}`}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
      <Link className={styles.titleLink} to={detailsPath} state={detailsState}>
        <h3 className={styles.title}>{movie.title}</h3>
      </Link>
    </article>
  )
}
