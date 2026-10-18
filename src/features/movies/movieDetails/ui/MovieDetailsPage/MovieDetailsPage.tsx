import { skipToken } from '@reduxjs/toolkit/query'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Path } from '@/common/routing/paths'
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
} from '@/features/movies/movieDetails/api'
import { MovieCast } from './MovieCast/MovieCast'
import { MovieDetailsSkeleton } from './MovieDetailsSkeleton/MovieDetailsSkeleton'
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
  const location = useLocation()
  const navigate = useNavigate()

  const details = useGetMovieDetailsQuery(queryId)
  const credits = useGetMovieCreditsQuery(queryId)
  const similar = useGetSimilarMoviesQuery(queryId)
  const navigationState: unknown = location.state
  const linkedMovieTitle =
    typeof navigationState === 'object' &&
    navigationState !== null &&
    'movieId' in navigationState &&
    navigationState.movieId === movieId &&
    'movieTitle' in navigationState &&
    typeof navigationState.movieTitle === 'string'
      ? navigationState.movieTitle.trim()
      : ''
  const cachedMovie = details.data
  const cachedTitle = cachedMovie && cachedMovie.id === movieId ? cachedMovie.title.trim() : ''
  const knownTitle = cachedTitle || linkedMovieTitle
  const isConnectionError = details.error && 'status' in details.error &&
    (details.error.status === 'FETCH_ERROR' || details.error.status === 'TIMEOUT_ERROR')

  const retryCredits = () => {
    if (movieId !== undefined && credits.isError && !credits.currentData && !credits.isFetching) {
      void credits.refetch()
    }
  }

  const retrySimilar = () => {
    if (movieId !== undefined && similar.isError && !similar.currentData && !similar.isFetching) {
      void similar.refetch()
    }
  }

  const handleRetry = () => {
    if (movieId === undefined || details.isFetching) return

    void details.refetch()
    retryCredits()
    retrySimilar()
  }

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
    return (
      <section className={styles.page}>
        <div className={styles.errorState}>
          <p className={styles.message}>Invalid movie address or ID.</p>
          <Link className={styles.homeLink} to={Path.Main}>Back to Home</Link>
        </div>
      </section>
    )
  }

  // currentData belongs to the requested ID, so a previous film cannot flash during navigation.
  const movie = details.currentData

  if (!movie && details.isFetching) {
    return <section className={styles.page}><MovieDetailsSkeleton /></section>
  }

  if (!movie && details.error && 'status' in details.error && details.error.status === 404) {
    return (
      <section className={styles.page}>
        <div className={styles.errorState}>
          <p className={styles.message}>Movie not found or details unavailable.</p>
          <Link className={styles.homeLink} to={Path.Main}>Back to Home</Link>
        </div>
      </section>
    )
  }

  if (!movie) {
    return (
      <section className={styles.page}>
        <div className={styles.errorState}>
          <p className={styles.message}>
            {knownTitle ? `Unable to load "${knownTitle}".` : 'Unable to load movie details.'}
            <br />
            {isConnectionError ? 'Please check your connection and try again.' : 'Please try again.'}
          </p>
          <button
            className={styles.retryButton}
            type="button"
            onClick={handleRetry}
            disabled={details.isFetching}
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.page}>
      <MovieInfo movie={movie} onBack={handleBack} />
      <MovieCast
        cast={credits.currentData?.cast}
        isLoading={credits.isLoading || (credits.isFetching && !credits.currentData)}
        isError={credits.isError && !credits.currentData}
        onRetry={retryCredits}
      />
      <SimilarMovies
        movies={similar.currentData?.results}
        isLoading={similar.isLoading || (similar.isFetching && !similar.currentData)}
        isError={similar.isError && !similar.currentData}
        onRetry={retrySimilar}
      />
    </section>
  )
}
