import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TMDB_MAX_PAGE } from '@/common/api/tmdb/tmdb.constants'
import { Pagination } from '@/common/components'
import { getMoviesCategoryPath } from '@/common/routing/paths'
import { useGetMoviesByCategoryQuery } from '@/features/movies/api'
import { MovieCategory } from '@/features/movies/model'
import { MovieCard } from '@/features/movies/ui/MovieCard/MovieCard'
import styles from './MoviesCategoryContent.module.css'

const categoryTitles: Record<MovieCategory, string> = {
  [MovieCategory.Popular]: 'Popular Movies',
  [MovieCategory.TopRated]: 'Top Rated Movies',
  [MovieCategory.Upcoming]: 'Upcoming Movies',
  [MovieCategory.NowPlaying]: 'Now Playing Movies',
}

type MoviesCategoryContentProps = {
  category: MovieCategory
}

export const MoviesCategoryContent = ({ category }: MoviesCategoryContentProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { currentData: data, isFetching, isError, error } = useGetMoviesByCategoryQuery({
    category,
    page: currentPage,
  })
  const totalPages = Math.min(data?.total_pages ?? 0, TMDB_MAX_PAGE)
  const isValidationError = error && 'name' in error && error.name === 'ZodError'

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.page}>
      <nav className={styles.categories} aria-label="Movie categories">
        {Object.values(MovieCategory).map((option) => (
          <Link
            key={option}
            className={`${styles.categoryLink} ${option === category ? styles.categoryLinkActive : ''}`}
            to={getMoviesCategoryPath(option)}
            aria-current={option === category ? 'page' : undefined}
          >
            {categoryTitles[option]}
          </Link>
        ))}
      </nav>

      <section className={styles.section} aria-labelledby="category-title">
        <h1 className={styles.title} id="category-title">{categoryTitles[category]}</h1>

        {isError ? (
          <p className={styles.message} role="alert">
            {isValidationError
              ? 'Movie data could not be validated.'
              : 'Unable to load movies. Please try again later.'}
          </p>
        ) : isFetching && !data ? (
          <p className={styles.message} role="status">Loading movies...</p>
        ) : data?.results.length === 0 ? (
          <p className={styles.message}>No movies available.</p>
        ) : (
          <div className={styles.moviesGrid}>
            {data?.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {!isError && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </div>
  )
}
