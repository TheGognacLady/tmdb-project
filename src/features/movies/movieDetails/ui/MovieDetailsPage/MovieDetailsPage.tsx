import { skipToken } from '@reduxjs/toolkit/query'
import { useNavigate, useParams } from 'react-router-dom'
import { Path } from '@/common/routing/paths'
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
} from '@/features/movies/movieDetails/api'
import { MovieCast } from './MovieCast/MovieCast'
import { MovieInfo } from './MovieInfo/MovieInfo'
import { SimilarMovies } from './SimilarMovies/SimilarMovies'
import styles from './MovieDetailsPage.module.css'

export const MovieDetailsPage = () => {
  const { movieId: movieIdParam } = useParams<{ movieId: string }>()
  const parsedId = Number(movieIdParam)
  const movieId =
    movieIdParam !== undefined &&
    /^\d+$/.test(movieIdParam) &&
    Number.isSafeInteger(parsedId) &&
    parsedId > 0
      ? parsedId
      : undefined
  const queryId = movieId ?? skipToken
  const navigate = useNavigate()

  const details = useGetMovieDetailsQuery(queryId)
  const credits = useGetMovieCreditsQuery(queryId)
  const similar = useGetSimilarMoviesQuery(queryId)

  const handleBack = () => {
    const historyState: unknown = window.history.state

    if (
      typeof historyState === 'object' &&
      historyState !== null &&
      'idx' in historyState &&
      typeof historyState.idx === 'number' &&
      historyState.idx > 0
    ) {
      navigate(-1)
      return
    }

    navigate(Path.Main, { replace: true })
  }

  if (movieId === undefined) {
    return <section className={styles.page}><p className={styles.message}>Movie not found.</p></section>
  }

  // currentData belongs to the requested ID, so a previous film cannot flash during navigation.
  const movie = details.currentData

  if (details.isLoading || (details.isFetching && !movie)) {
    return <section className={styles.page}><p className={styles.message} role="status">Loading movie details...</p></section>
  }

  if (details.isError) {
    return <section className={styles.page}><p className={styles.message} role="alert">Unable to load movie details. Please try again later.</p></section>
  }

  if (!movie) {
    return <section className={styles.page}><p className={styles.message}>Movie not found.</p></section>
  }

  return (
    <section className={styles.page}>
      <MovieInfo movie={movie} onBack={handleBack} />
      <MovieCast
        cast={credits.currentData?.cast}
        isLoading={credits.isLoading || (credits.isFetching && !credits.currentData)}
        isError={credits.isError}
      />
      <SimilarMovies
        movies={similar.currentData?.results}
        isLoading={similar.isLoading || (similar.isFetching && !similar.currentData)}
        isError={similar.isError}
      />
    </section>
  )
}
