import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { loadFavorites } from './favorites.storage'
import type { FavoriteMovie } from './favorites.schemas'

type FavoritesState = {
  items: FavoriteMovie[]
}

const initialState: FavoritesState = {
  items: loadFavorites(),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteMovie>) => {
      const index = state.items.findIndex((movie) => movie.id === action.payload.id)

      if (index !== -1) {
        state.items.splice(index, 1)
        return
      }

      const { id, title, posterUrl, voteAverage } = action.payload
      state.items.push({ id, title, posterUrl, voteAverage })
    },
  },
  selectors: {
    selectFavorites: (state) => state.items,
    selectIsFavorite: (state, movieId: number) =>
      state.items.some((movie) => movie.id === movieId),
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export const { selectFavorites, selectIsFavorite } = favoritesSlice.selectors
export const favoritesReducer = favoritesSlice.reducer
