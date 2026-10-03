import { baseApi } from '@/app/api/baseApi'
import { genresListSchema } from '@/features/filteredMovies/model'
import type { FilteredMoviesParams, GenresList } from '@/features/filteredMovies/model'
import { moviesListSchema } from '@/features/movies/model'
import type { MoviesList } from '@/features/movies/model'

export const filteredMoviesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFilteredMovies: builder.query<MoviesList, FilteredMoviesParams>({
      query: ({ page = 1, sortBy = 'popularity.desc', minRating, maxRating, genreIds }) => ({
        url: 'discover/movie',
        params: {
          page,
          sort_by: sortBy,
          ...(minRating !== undefined && minRating !== 0 ? { 'vote_average.gte': minRating } : {}),
          ...(maxRating !== undefined && maxRating !== 10 ? { 'vote_average.lte': maxRating } : {}),
          ...(genreIds?.length ? { with_genres: genreIds.join(',') } : {}),
        },
      }),
      transformResponse: (response: unknown) => moviesListSchema.parse(response),
    }),
    getMovieGenres: builder.query<GenresList, void>({
      query: () => ({ url: 'genre/movie/list' }),
      transformResponse: (response: unknown) => genresListSchema.parse(response),
    }),
  }),
})

export const { useGetFilteredMoviesQuery, useGetMovieGenresQuery } = filteredMoviesApi
