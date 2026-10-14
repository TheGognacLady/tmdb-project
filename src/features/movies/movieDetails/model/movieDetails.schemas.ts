import { z } from 'zod'

const movieGenreSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
})

export const movieDetailsSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string().nullish(),
  vote_average: z.number(),
  runtime: z.number().int().nonnegative().nullish(),
  overview: z.string().nullish(),
  genres: z.array(movieGenreSchema),
})

const castMemberSchema = z.object({
  id: z.number().int().positive(),
  credit_id: z.string(),
  name: z.string(),
  character: z.string().nullish(),
  profile_path: z.string().nullable(),
  order: z.number().int().nonnegative(),
})

export const movieCreditsSchema = z.object({
  id: z.number().int().positive(),
  cast: z.array(castMemberSchema),
})

export type MovieDetails = z.infer<typeof movieDetailsSchema>
export type CastMember = z.infer<typeof castMemberSchema>
export type MovieCredits = z.infer<typeof movieCreditsSchema>
