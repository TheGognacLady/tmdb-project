import type { MovieDetails } from '@/features/movies/movieDetails/model'
import styles from './MovieInfoPoster.module.css'

type MovieInfoPosterProps = {
  posterPath: MovieDetails['poster_path']
  title: MovieDetails['title']
}

export const MovieInfoPoster = ({ posterPath, title }: MovieInfoPosterProps) => (
  <div className={styles.posterWrapper}>
    {posterPath ? (
      <img
        className={styles.poster}
        src={`https://image.tmdb.org/t/p/w342${posterPath}`}
        alt={`${title} poster`}
      />
    ) : (
      <div className={styles.posterFallback} role="img" aria-label={`${title} poster unavailable`}>
        No Poster
      </div>
    )}
  </div>
)
