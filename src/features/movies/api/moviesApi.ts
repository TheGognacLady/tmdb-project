import { baseApi } from '@/app/api/baseApi'
import { MovieCategory, moviesListSchema } from '@/features/movies/model'
import type { MoviesList } from '@/features/movies/model'

const tmdbCategoryByMovieCategory = {
  [MovieCategory.Popular]: 'popular',
  [MovieCategory.TopRated]: 'top_rated',
  [MovieCategory.Upcoming]: 'upcoming',
  [MovieCategory.NowPlaying]: 'now_playing',
} satisfies Record<MovieCategory, string>

type MoviesListParams = {
  page?: number
  language?: string
  region?: string
}

type MoviesByCategoryParams = MoviesListParams & {
  category: MovieCategory
}

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMoviesByCategory: builder.query<MoviesList, MoviesByCategoryParams>({
      query: ({ category, page = 1, language = 'en-US', region }) => ({
        url: `movie/${tmdbCategoryByMovieCategory[category]}`,
        params: {
          page,
          language,
          ...(region !== undefined ? { region } : {}),
        },
      }),
      transformResponse: (response: unknown) => moviesListSchema.parse(response),
    }),
  }),
})

export const { useGetMoviesByCategoryQuery } = moviesApi
