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

  if (!movie && (details.isLoading || details.isFetching)) {
    return <section className={styles.page}><p className={styles.message} role="status">Loading movie details...</p></section>
  }

  if (!movie && details.error && 'status' in details.error && details.error.status === 404) {
    return <section className={styles.page}><p className={styles.message}>Movie not found or details unavailable.</p></section>
  }

  if (!movie && details.isError) {
    return (
      <section className={styles.page}>
        <div className={styles.errorState}>
          <p className={styles.message}>Unable to load movie details.</p>
          <button
            className={styles.retryButton}
            type="button"
            onClick={() => { void details.refetch() }}
            disabled={details.isFetching}
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  if (!movie) {
    return <section className={styles.page}><p className={styles.message} role="status">Loading movie details...</p></section>
  }

  return (
    <section className={styles.page}>
      <MovieInfo movie={movie} onBack={handleBack} />
      <MovieCast
        cast={credits.currentData?.cast}
        isLoading={credits.isLoading || (credits.isFetching && !credits.currentData)}
        isError={credits.isError && !credits.currentData}
      />
      <SimilarMovies
        movies={similar.currentData?.results}
        isLoading={similar.isLoading || (similar.isFetching && !similar.currentData)}
        isError={similar.isError && !similar.currentData}
      />
    </section>
  )
}
