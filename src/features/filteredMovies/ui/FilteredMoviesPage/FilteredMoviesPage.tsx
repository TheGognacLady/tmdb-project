import { useEffect, useState } from 'react'
import type { FilteredMoviesSort } from '@/features/filteredMovies/model'
import { FilterPanel } from './FilterPanel/FilterPanel'
import { FilteredMoviesResults } from './FilteredMoviesResults/FilteredMoviesResults'
import styles from './FilteredMoviesPage.module.css'

export const FilteredMoviesPage = () => {
  const [sortBy, setSortBy] = useState<FilteredMoviesSort>('popularity.desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [minRating, setMinRating] = useState(0)
  const [maxRating, setMaxRating] = useState(10)
  const [debouncedMinRating, setDebouncedMinRating] = useState(0)
  const [debouncedMaxRating, setDebouncedMaxRating] = useState(10)
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([])
  const isRatingPending =
    minRating !== debouncedMinRating || maxRating !== debouncedMaxRating

  useEffect(() => {
    if (minRating === debouncedMinRating && maxRating === debouncedMaxRating) {
      return
    }

    const timeoutId = setTimeout(() => {
      setDebouncedMinRating(minRating)
      setDebouncedMaxRating(maxRating)
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [minRating, maxRating, debouncedMinRating, debouncedMaxRating])

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

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenreIds((currentGenreIds) =>
      currentGenreIds.includes(genreId)
        ? currentGenreIds.filter((id) => id !== genreId)
        : [...currentGenreIds, genreId],
    )
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSortBy('popularity.desc')
    setMinRating(0)
    setMaxRating(10)
    setDebouncedMinRating(0)
    setDebouncedMaxRating(10)
    setSelectedGenreIds([])
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
        selectedGenreIds={selectedGenreIds}
        onGenreToggle={handleGenreToggle}
        onResetFilters={handleResetFilters}
      />
      <FilteredMoviesResults
        sortBy={sortBy}
        currentPage={currentPage}
        minRating={debouncedMinRating}
        maxRating={debouncedMaxRating}
        isRatingPending={isRatingPending}
        genreIds={selectedGenreIds}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
