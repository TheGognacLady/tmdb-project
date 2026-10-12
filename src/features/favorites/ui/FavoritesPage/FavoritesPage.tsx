import { useAppSelector } from '@/app/model/hooks'
import { selectFavorites } from '@/features/favorites/model'
import { MovieCard } from '@/features/movies/ui'
import styles from './FavoritesPage.module.css'

export const FavoritesPage = () => {
  const favorites = useAppSelector(selectFavorites)

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Favorites</h1>
      {favorites.length === 0 ? (
        <p className={styles.message}>Add movies to favorites to see them on this page.</p>
      ) : (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Favorite Movies</h2>
          <div className={styles.moviesGrid}>
            {favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        </div>
      )}
    </section>
  )
}
