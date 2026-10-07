import { useGetMovieGenresQuery } from '@/features/filteredMovies/api'
import styles from './GenresFilter.module.css'

type GenresFilterProps = {
  selectedGenreIds: number[]
  onGenreToggle: (genreId: number) => void
}

export const GenresFilter = ({ selectedGenreIds, onGenreToggle }: GenresFilterProps) => {
  const { data, isLoading, isError } = useGetMovieGenresQuery()

  return (
    <div className={styles.genres} role="group" aria-label="Genres">
      {isLoading ? (
        <p className={styles.message} role="status">Loading genres...</p>
      ) : isError ? (
        <p className={styles.message} role="alert">Failed to load genres.</p>
      ) : (
        data?.genres.map((genre) => {
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
      )}
    </div>
  )
}
