import type { ChangeEvent } from 'react'
import type { FilteredMoviesSort } from '@/features/filteredMovies/model'
import styles from './SortBy.module.css'

type SortByProps = {
  value: FilteredMoviesSort
  onChange: (sortBy: FilteredMoviesSort) => void
}

const sortOptions: { value: FilteredMoviesSort; label: string }[] = [
  { value: 'popularity.desc', label: 'Popularity ↓' },
  { value: 'popularity.asc', label: 'Popularity ↑' },
  { value: 'vote_average.desc', label: 'Rating ↓' },
  { value: 'vote_average.asc', label: 'Rating ↑' },
  { value: 'primary_release_date.desc', label: 'Release Date ↓' },
  { value: 'primary_release_date.asc', label: 'Release Date ↑' },
  { value: 'title.asc', label: 'Title A–Z' },
  { value: 'title.desc', label: 'Title Z–A' },
]

export const SortBy = ({ value, onChange }: SortByProps) => {
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = sortOptions.find((option) => option.value === event.target.value)

    if (selectedOption) {
      onChange(selectedOption.value)
    }
  }

  return (
    <div className={styles.sortField}>
      <label className={styles.label} htmlFor="filtered-movies-sort">Sort by</label>
      <select
        className={styles.select}
        id="filtered-movies-sort"
        value={value}
        onChange={handleSortChange}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}
