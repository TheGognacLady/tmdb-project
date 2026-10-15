import { baseApi } from '@/app/api/baseApi'
import { moviesListSchema } from '@/features/movies/model'
import type { MoviesList } from '@/features/movies/model'

type SearchMoviesParams = {
  query: string
  page?: number
}

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchedMovies: builder.query<MoviesList, SearchMoviesParams>({
      query: ({ query, page = 1 }) => ({
        url: 'search/movie',
        params: { query, page },
      }),
      responseSchema: moviesListSchema,
    }),
  }),
})

export const { useGetSearchedMoviesQuery } = searchApi
