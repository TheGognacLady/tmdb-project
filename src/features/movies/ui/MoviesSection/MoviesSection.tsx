import { Link } from 'react-router-dom'
import { getMoviesCategoryPath } from '@/common/routing/paths'
import { useGetMoviesByCategoryQuery } from '@/features/movies/api'
import type { MovieCategory } from '@/features/movies/model'
import { MovieCard } from '@/features/movies/ui/MovieCard/MovieCard'
import { MovieCardSkeleton } from '@/features/movies/ui/MovieCardSkeleton/MovieCardSkeleton'
import styles from './MoviesSection.module.css'

type MoviesSectionProps = {
  title: string
  category: MovieCategory
}

export const MoviesSection = ({ title, category }: MoviesSectionProps) => {
  const { currentData: data, isFetching } = useGetMoviesByCategoryQuery({ category, page: 1 })
  const movies = data?.results.slice(0, 6) ?? []
  const titleId = `${category}-title`
  const showSkeletons = !data && isFetching

  return (
    <div className={styles.moviesContainer}>
      <section className={styles.movieSection} aria-labelledby={titleId}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle} id={titleId}>{title}</h2>
          <Link className={styles.viewMore} to={getMoviesCategoryPath(category)}>
            View More
          </Link>
        </div>
        {data ? (
          movies.length === 0 ? (
            <p className={styles.message}>No movies available.</p>
          ) : (
            <div className={styles.moviesGrid} aria-busy={isFetching}>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )
        ) : showSkeletons ? (
          <div className={styles.moviesGrid} role="status" aria-label={`Loading ${title}`}>
            {Array.from({ length: 6 }, (_, index) => <MovieCardSkeleton key={index} />)}
          </div>
        ) : (
          <p className={styles.message}>Movies are unavailable.</p>
        )}
      </section>
    </div>
  )
}
