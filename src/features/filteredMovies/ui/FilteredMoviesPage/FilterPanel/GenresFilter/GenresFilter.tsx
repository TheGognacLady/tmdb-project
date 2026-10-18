import { useGetMovieGenresQuery } from '@/features/filteredMovies/api'
import styles from './GenresFilter.module.css'

type GenresFilterProps = {
  selectedGenreIds: number[]
  onGenreToggle: (genreId: number) => void
}

export const GenresFilter = ({ selectedGenreIds, onGenreToggle }: GenresFilterProps) => {
  const { data, isFetching, isError, refetch } = useGetMovieGenresQuery()

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
        <div className={styles.skeletons} role="status" aria-label="Loading genres">
          {Array.from({ length: 6 }, (_, index) => (
            <span className={styles.skeleton} aria-hidden="true" key={index} />
          ))}
        </div>
      ) : isError ? (
        <>
          <p className={styles.message}>Genres are unavailable.</p>
          <button className={styles.genreButton} type="button" onClick={() => { void refetch() }}>
            Retry
          </button>
        </>
      ) : null}
    </div>
  )
}
