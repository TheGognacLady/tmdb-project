import { useGetMovieGenresQuery } from '@/features/filteredMovies/api'
import styles from './GenresFilter.module.css'

type GenresFilterProps = {
  selectedGenreIds: number[]
  onGenreToggle: (genreId: number) => void
}

export const GenresFilter = ({ selectedGenreIds, onGenreToggle }: GenresFilterProps) => {
  const { data, isFetching, isError } = useGetMovieGenresQuery()

  return (
    <div className={styles.genres} role="group" aria-label="Genres">
      {data ? (
        data.genres.length === 0 ? (
          <p className={styles.message}>No genres available.</p>
        ) : data.genres.map((genre) => {
          const isSelected = selectedGenreIds.includes(genre.id)

          return (
            <button
              className={`${styles.genreButton} ${isSelected ? styles.genreButtonActive : ''}`}
              key={genre.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onGenreToggle(genre.id)}
            >
              {genre.name}
            </button>
          )
        })
      ) : isFetching ? (
        <p className={styles.message} role="status">Loading genres...</p>
      ) : isError ? (
        <p className={styles.message}>Genres are unavailable.</p>
      ) : (
        <p className={styles.message} role="status">Loading genres...</p>
      )}
    </div>
  )
}
