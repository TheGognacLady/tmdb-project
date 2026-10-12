import { z } from 'zod'

export const favoriteMovieSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  posterUrl: z.string().nullable(),
  voteAverage: z.number().min(0).max(10),
})

export type FavoriteMovie = z.infer<typeof favoriteMovieSchema>
