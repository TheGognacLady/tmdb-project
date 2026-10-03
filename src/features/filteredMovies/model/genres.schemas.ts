import { z } from 'zod'

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const genresListSchema = z.object({
  genres: z.array(genreSchema),
})

export type Genre = z.infer<typeof genreSchema>
export type GenresList = z.infer<typeof genresListSchema>
