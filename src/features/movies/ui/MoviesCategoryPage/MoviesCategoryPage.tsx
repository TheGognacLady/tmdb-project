import { useParams } from 'react-router-dom'
import { NotFoundPage } from '@/app/ui/NotFoundPage/NotFoundPage'
import { MovieCategory } from '@/features/movies/model'
import { MoviesCategoryContent } from './MoviesCategoryContent/MoviesCategoryContent'

const isMovieCategory = (value: string | undefined): value is MovieCategory =>
  Object.values(MovieCategory).some((category) => category === value)

export const MoviesCategoryPage = () => {
  const { category } = useParams()

  if (!isMovieCategory(category)) {
    return <NotFoundPage />
  }

  return <MoviesCategoryContent key={category} category={category} />
}
