import type { MovieDetails } from '@/features/movies/movieDetails/model'
import styles from './MovieInfoGenres.module.css'

type MovieInfoGenresProps = {
  genres: MovieDetails['genres']
}

export const MovieInfoGenres = ({ genres }: MovieInfoGenresProps) => (
  <div className={styles.genres}>
    <h2 className={styles.genresTitle}>Genres</h2>
    {genres.length > 0 ? (
      <ul className={styles.genresList}>
        {genres.map((genre) => (
          <li className={styles.genre} key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    ) : (
      <p className={styles.genresEmpty}>No genres available.</p>
    )}
  </div>
)
