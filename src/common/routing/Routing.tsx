import { Route, Routes } from 'react-router-dom'
import { MainPage } from '@/app/ui/MainPage/MainPage'
import { NotFoundPage } from '@/app/ui/NotFoundPage/NotFoundPage'
import { Path } from '@/common/routing/paths'
import { FavoritesPage } from '@/features/favorites/ui'
import { FilteredMoviesPage } from '@/features/filteredMovies/ui'
import { MovieDetailsPage, MoviesCategoryPage } from '@/features/movies/ui'
import { SearchPage } from '@/features/search/ui'

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<MainPage />} />
      <Route path={Path.Movies} element={<MoviesCategoryPage />} />
      <Route path={Path.FilteredMovies} element={<FilteredMoviesPage />} />
      <Route path={Path.Search} element={<SearchPage />} />
      <Route path={Path.Favorites} element={<FavoritesPage />} />
      <Route path={Path.MovieDetails} element={<MovieDetailsPage />} />
      <Route path={Path.NotFound} element={<NotFoundPage />} />
    </Routes>
  )
}
