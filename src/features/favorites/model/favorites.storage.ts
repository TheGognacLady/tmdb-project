import { favoriteMovieSchema } from './favorites.schemas'
import type { FavoriteMovie } from './favorites.schemas'

const FAVORITES_STORAGE_KEY = 'Favorites'

export const loadFavorites = (): FavoriteMovie[] => {
  try {
    const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY)

    if (!storedFavorites) {
      return []
    }

    const parsedFavorites: unknown = JSON.parse(storedFavorites)

    if (!Array.isArray(parsedFavorites)) {
      return []
    }

    const seenIds = new Set<number>()

    return parsedFavorites.flatMap((movie: unknown) => {
      const result = favoriteMovieSchema.safeParse(movie)

      if (!result.success || seenIds.has(result.data.id)) {
        return []
      }

      seenIds.add(result.data.id)
      return [result.data]
    })
  } catch {
    return []
  }
}

export const saveFavorites = (favorites: FavoriteMovie[]): void => {
  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
  } catch {
    // Favorites remain available in Redux when browser storage is unavailable.
  }
}
