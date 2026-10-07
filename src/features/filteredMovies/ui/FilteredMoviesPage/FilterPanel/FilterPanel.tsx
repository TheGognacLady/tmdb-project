import type { FilteredMoviesSort } from '@/features/filteredMovies/model'
import { GenresFilter } from './GenresFilter/GenresFilter'
import { RatingFilter } from './RatingFilter/RatingFilter'
import { ResetFilters } from './ResetFilters/ResetFilters'
import { SortBy } from './SortBy/SortBy'
import styles from './FilterPanel.module.css'

type FilterPanelProps = {
  sortBy: FilteredMoviesSort
  onSortByChange: (sortBy: FilteredMoviesSort) => void
  minRating: number
  maxRating: number
  onRatingChange: (minRating: number, maxRating: number) => void
  selectedGenreIds: number[]
  onGenreToggle: (genreId: number) => void
  onResetFilters: () => void
}

export const FilterPanel = ({
  sortBy,
  onSortByChange,
  minRating,
  maxRating,
  onRatingChange,
  selectedGenreIds,
  onGenreToggle,
  onResetFilters,
}: FilterPanelProps) => {
  return (
    <aside className={styles.panel} aria-label="Movie filters">
      <h1 className={styles.title}>Filters / Sort</h1>
      <SortBy value={sortBy} onChange={onSortByChange} />
      <RatingFilter
        minRating={minRating}
        maxRating={maxRating}
        onChange={onRatingChange}
      />
      <GenresFilter selectedGenreIds={selectedGenreIds} onGenreToggle={onGenreToggle} />
      <ResetFilters onReset={onResetFilters} />
    </aside>
  )
}
