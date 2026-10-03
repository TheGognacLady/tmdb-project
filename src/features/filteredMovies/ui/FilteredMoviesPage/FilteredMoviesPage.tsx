import { useState } from 'react'
import type { FilteredMoviesSort } from '@/features/filteredMovies/model'
import { FilterPanel } from '../FilterPanel/FilterPanel'
import { FilteredMoviesResults } from '../FilteredMoviesResults/FilteredMoviesResults'
import styles from './FilteredMoviesPage.module.css'

export const FilteredMoviesPage = () => {
  const [sortBy, setSortBy] = useState<FilteredMoviesSort>('popularity.desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [minRating, setMinRating] = useState(0)
  const [maxRating, setMaxRating] = useState(10)

  const handleSortByChange = (nextSortBy: FilteredMoviesSort) => {
    setSortBy(nextSortBy)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleRatingChange = (nextMinRating: number, nextMaxRating: number) => {
    setMinRating(nextMinRating)
    setMaxRating(nextMaxRating)
    setCurrentPage(1)
  }

  return (
    <div className={styles.page}>
      <FilterPanel
        sortBy={sortBy}
        onSortByChange={handleSortByChange}
        minRating={minRating}
        maxRating={maxRating}
        onRatingChange={handleRatingChange}
      />
      <FilteredMoviesResults
        sortBy={sortBy}
        currentPage={currentPage}
        minRating={minRating}
        maxRating={maxRating}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
