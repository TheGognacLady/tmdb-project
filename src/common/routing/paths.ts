import type { MovieCategory } from '@/features/movies/model'

export const Path = {
  Main: '/',
  Movies: '/movies/:category',
  FilteredMovies: '/filtered',
  Search: '/search',
  Favorites: '/favorites',
  MovieDetails: '/movie/:movieId',
  NotFound: '*',
} as const

export const getMoviesCategoryPath = (category: MovieCategory) =>
  Path.Movies.replace(':category', encodeURIComponent(category))

export const getMovieDetailsPath = (movieId: number) =>
  Path.MovieDetails.replace(':movieId', encodeURIComponent(String(movieId)))
