import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/app/api/baseApi'
import { favoritesReducer, saveFavorites, selectFavorites } from '@/features/favorites/model'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

let previousFavorites = selectFavorites(store.getState())

store.subscribe(() => {
  const favorites = selectFavorites(store.getState())

  if (favorites !== previousFavorites) {
    previousFavorites = favorites
    saveFavorites(favorites)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
