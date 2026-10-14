import { baseApi } from '@/app/api/baseApi'
import { moviesListSchema } from '@/features/movies/model'
import type { MoviesList } from '@/features/movies/model'
import { movieCreditsSchema, movieDetailsSchema } from '@/features/movies/movieDetails/model'
import type { MovieCredits, MovieDetails } from '@/features/movies/movieDetails/model'

export const movieDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovieDetails: builder.query<MovieDetails, number>({
      query: (movieId) => ({ url: `movie/${movieId}`, params: { language: 'en-US' } }),
      transformResponse: (response: unknown) => movieDetailsSchema.parse(response),
    }),
    getMovieCredits: builder.query<MovieCredits, number>({
      query: (movieId) => ({ url: `movie/${movieId}/credits`, params: { language: 'en-US' } }),
      transformResponse: (response: unknown) => movieCreditsSchema.parse(response),
    }),
    getSimilarMovies: builder.query<MoviesList, number>({
      query: (movieId) => ({ url: `movie/${movieId}/similar`, params: { language: 'en-US', page: 1 } }),
      transformResponse: (response: unknown) => moviesListSchema.parse(response),
    }),
  }),
})

export const {
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
} = movieDetailsApi
