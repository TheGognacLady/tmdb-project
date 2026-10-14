import type { MovieDetails } from '@/features/movies/movieDetails/model'
import { MovieInfoGeneral } from './MovieInfoGeneral/MovieInfoGeneral'
import { MovieInfoGenres } from './MovieInfoGenres/MovieInfoGenres'
import { MovieInfoPoster } from './MovieInfoPoster/MovieInfoPoster'
import styles from './MovieInfo.module.css'

type MovieInfoProps = {
  movie: MovieDetails
  onBack: () => void
}

export const MovieInfo = ({ movie, onBack }: MovieInfoProps) => (
  <div className={styles.content}>
    <MovieInfoPoster posterPath={movie.poster_path} title={movie.title} />
    <div className={styles.details}>
      <MovieInfoGeneral movie={movie} onBack={onBack} />
      <MovieInfoGenres genres={movie.genres} />
    </div>
  </div>
)
