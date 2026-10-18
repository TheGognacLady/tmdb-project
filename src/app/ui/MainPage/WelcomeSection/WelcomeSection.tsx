import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SearchForm } from '@/common/components'
import { getMovieDetailsPath, Path } from '@/common/routing/paths'
import { useGetMoviesByCategoryQuery } from '@/features/movies/api'
import { MovieCategory } from '@/features/movies/model'
import { MovieRating } from '@/features/movies/ui/MovieRating/MovieRating'
import styles from './WelcomeSection.module.css'

const SLIDE_DURATION = 8000
const FADE_DURATION = 1300
const backdropUrl = (path: string) => `https://image.tmdb.org/t/p/w1280${path}`

type SlideState = {
  active: number
  outgoing: number | null
}

export const WelcomeSection = () => {
  const navigate = useNavigate()
  const { currentData: data, isFetching } = useGetMoviesByCategoryQuery({ category: MovieCategory.Popular, page: 1 })
  const slides = useMemo(
    () => data?.results.filter((movie) => movie.backdrop_path).slice(0, 6) ?? [],
    [data],
  )
  const [slideState, setSlideState] = useState<SlideState>({ active: 0, outgoing: null })
  const [isFocusWithin, setIsFocusWithin] = useState(false)
  const pointerFocus = useRef(false)
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const transitionInProgress = useRef(false)
  const activeIndex = slideState.active % Math.max(slides.length, 1)
  const movie = slides[activeIndex]
  const outgoingMovie = slideState.outgoing === null ? null : slides[slideState.outgoing]

  const changeSlide = useCallback((direction: 1 | -1) => {
    if (slides.length < 2 || transitionInProgress.current) return

    transitionInProgress.current = true
    setSlideState(({ active }) => ({
      active: (active + direction + slides.length) % slides.length,
      outgoing: active,
    }))
    transitionTimer.current = setTimeout(() => {
      setSlideState(({ active }) => ({ active, outgoing: null }))
      transitionInProgress.current = false
      transitionTimer.current = null
    }, FADE_DURATION)
  }, [slides.length])

  useEffect(() => {
    if (slides.length < 2 || isFocusWithin) return
    const timer = setTimeout(() => changeSlide(1), SLIDE_DURATION)
    return () => clearTimeout(timer)
  }, [activeIndex, changeSlide, isFocusWithin, slides.length])

  useEffect(() => {
    if (slides.length < 2) return
    const nextPath = slides[(activeIndex + 1) % slides.length].backdrop_path
    if (!nextPath) return
    const image = new Image()
    image.src = backdropUrl(nextPath)
  }, [activeIndex, slides])

  useEffect(() => () => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current)
  }, [])

  const handleSearch = (query: string) => {
    const params = new URLSearchParams({ query })
    navigate(`${Path.Search}?${params.toString()}`)
  }

  const renderMovieInfo = (featuredMovie: NonNullable<typeof movie>, isOutgoing = false) => {
    const year = featuredMovie.release_date ? featuredMovie.release_date.slice(0, 4) : null
    const hasRating = Number.isFinite(featuredMovie.vote_average) && featuredMovie.vote_count > 0

    return (
      <div
        className={`${styles.movieInfo}${featuredMovie.title.length > 34 ? ` ${styles.longMovieInfo}` : ''}${isOutgoing ? ` ${styles.leaving}` : outgoingMovie ? ` ${styles.entering}` : ''}`}
        key={featuredMovie.id}
        aria-hidden={isOutgoing}
        inert={isOutgoing}
      >
        <h1 className={styles.title} id={isOutgoing ? undefined : 'welcome-title'}>{featuredMovie.title}</h1>
        <div className={styles.metadata}>
          {year && <span>{year}</span>}
          {hasRating && (
            <span className={styles.ratingGroup}>
              <MovieRating rating={featuredMovie.vote_average} className={styles.heroRating} />
              <span>TMDB</span>
            </span>
          )}
          <Link className={styles.detailsLink} to={getMovieDetailsPath(featuredMovie.id)}>View Details</Link>
        </div>
      </div>
    )
  }

  return (
    <section
      className={styles.welcome}
      aria-labelledby="welcome-title"
      aria-busy={!data && isFetching}
      onPointerDownCapture={() => {
        pointerFocus.current = true
        setIsFocusWithin(false)
      }}
      onKeyDownCapture={() => { pointerFocus.current = false }}
      onFocusCapture={() => {
        if (!pointerFocus.current) setIsFocusWithin(true)
        pointerFocus.current = false
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          pointerFocus.current = false
          setIsFocusWithin(false)
        }
      }}
    >
      {movie?.backdrop_path && (
        <div className={styles.backdrops} aria-hidden="true">
          {outgoingMovie?.backdrop_path && (
            <div
              className={styles.slide}
              key={outgoingMovie.id}
            >
              <div
                className={styles.backdrop}
                style={{ backgroundImage: `url("${backdropUrl(outgoingMovie.backdrop_path)}")` }}
              />
            </div>
          )}
          <div
            key={movie.id}
            className={`${styles.slide}${outgoingMovie ? ` ${styles.entering}` : ''}`}
          >
            <div
              className={styles.backdrop}
              style={{ backgroundImage: `url("${backdropUrl(movie.backdrop_path)}")` }}
            />
          </div>
        </div>
      )}
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.container}>
        {outgoingMovie && renderMovieInfo(outgoingMovie, true)}
        {movie ? (
          renderMovieInfo(movie)
        ) : (
          <div className={styles.fallback} role="status">
            <h1 className={styles.title} id="welcome-title">Welcome</h1>
            <p>{isFetching ? 'Loading featured movies…' : 'Featured movies are unavailable right now.'}</p>
          </div>
        )}
        <div className={styles.searchArea}>
          <h2 className={styles.welcomeTitle}>WELCOME</h2>
          <p className={styles.subtitle}>Browse highlighted titles from TMDB</p>
          <div className={styles.formWrapper}><SearchForm onSearch={handleSearch} /></div>
        </div>
        {slides.length > 1 && (
          <div className={styles.controls} aria-label="Movie slides">
            <button className={styles.arrow} type="button" aria-label="Previous movie" onClick={() => changeSlide(-1)}>‹</button>
            <button className={styles.arrow} type="button" aria-label="Next movie" onClick={() => changeSlide(1)}>›</button>
          </div>
        )}
      </div>
    </section>
  )
}
