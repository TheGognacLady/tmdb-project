import type { FilteredMoviesSort } from '@/features/filteredMovies/model'
import { RatingFilter } from './RatingFilter/RatingFilter'
import { SortBy } from './SortBy/SortBy'
import styles from './FilterPanel.module.css'

type FilterPanelProps = {
  sortBy: FilteredMoviesSort
  onSortByChange: (sortBy: FilteredMoviesSort) => void
  minRating: number
  maxRating: number
  onRatingChange: (minRating: number, maxRating: number) => void
}

export const FilterPanel = ({
  sortBy,
  onSortByChange,
  minRating,
  maxRating,
  onRatingChange,
}: FilterPanelProps) => {
  return (
    <aside className={styles.panel} aria-label="Movie filters">
      <h1 className={styles.title}>Filters / Sort</h1>
      <SortBy value={sortBy} onChange={onSortByChange} />
      <RatingFilter minRating={minRating} maxRating={maxRating} onChange={onRatingChange} />
    </aside>
  )
}
