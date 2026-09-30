export const MovieCategory = {
  Popular: 'popular',
  TopRated: 'top-rated',
  Upcoming: 'upcoming',
  NowPlaying: 'now-playing',
} as const

export type MovieCategory =
  (typeof MovieCategory)[keyof typeof MovieCategory]
