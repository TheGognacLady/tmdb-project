export type FilteredMoviesSort =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'vote_average.desc'
  | 'vote_average.asc'
  | 'primary_release_date.desc'
  | 'primary_release_date.asc'
  | 'title.asc'
  | 'title.desc'

export type FilteredMoviesParams = {
  page?: number
  sortBy?: FilteredMoviesSort
  minRating?: number
  maxRating?: number
  genreIds?: number[]
}
