import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchForm } from '@/common/components'
import { Path } from '@/common/routing/paths'
import { useGetMoviesByCategoryQuery } from '@/features/movies/api'
import { MovieCategory } from '@/features/movies/model'
import styles from './WelcomeSection.module.css'

export const WelcomeSection = () => {
  const navigate = useNavigate()
  const { data } = useGetMoviesByCategoryQuery({ category: MovieCategory.Popular, page: 1 })

  const backdropPath = useMemo(() => {
    const moviesWithBackdrop = data?.results.filter((movie) => movie.backdrop_path !== null) ?? []

    if (moviesWithBackdrop.length === 0) {
      return null
    }

    const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length)
    return moviesWithBackdrop[randomIndex].backdrop_path
  }, [data?.results])

  const backdropUrl = backdropPath
    ? `https://image.tmdb.org/t/p/original${backdropPath}`
    : null

  const handleSearch = (query: string) => {
    const params = new URLSearchParams({ query })
    navigate(`${Path.Search}?${params.toString()}`)
  }

  return (
    <section
      className={styles.welcome}
      style={backdropUrl ? { backgroundImage: `url("${backdropUrl}")` } : undefined}
      aria-labelledby="welcome-title"
    >
      <div className={styles.container}>
        <h1 className={styles.title} id="welcome-title">Welcome</h1>
        <p className={styles.subtitle}>Browse highlighted titles from TMDB</p>
        <div className={styles.formWrapper}>
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>
    </section>
  )
}
