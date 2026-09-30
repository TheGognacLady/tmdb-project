import { Link } from 'react-router-dom'
import { getMoviesCategoryPath } from '@/common/routing/paths'
import { useGetMoviesByCategoryQuery } from '@/features/movies/api'
import type { MovieCategory } from '@/features/movies/model'
import { MovieCard } from '@/features/movies/ui/MovieCard/MovieCard'
import styles from './MoviesSection.module.css'

type MoviesSectionProps = {
  title: string
  category: MovieCategory
}

export const MoviesSection = ({ title, category }: MoviesSectionProps) => {
  const { data } = useGetMoviesByCategoryQuery({ category, page: 1 })
  const movies = data?.results.slice(0, 6) ?? []
  const titleId = `${category}-title`

  return (
    <div className={styles.moviesContainer}>
      <section className={styles.movieSection} aria-labelledby={titleId}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle} id={titleId}>{title}</h2>
          <Link className={styles.viewMore} to={getMoviesCategoryPath(category)}>
            View More
          </Link>
        </div>
        <div className={styles.moviesGrid}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  )
}
