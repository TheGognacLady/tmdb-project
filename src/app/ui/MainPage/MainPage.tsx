import { MovieCategory } from '@/features/movies/model'
import { MoviesSection } from '@/features/movies/ui'
import { WelcomeSection } from './WelcomeSection/WelcomeSection'
import styles from './MainPage.module.css'

export const MainPage = () => {
  return (
    <>
      <WelcomeSection />
      <div className={styles.moviesSections}>
        <MoviesSection title="Popular Movies" category={MovieCategory.Popular} />
        <MoviesSection title="Top Rated Movies" category={MovieCategory.TopRated} />
        <MoviesSection title="Upcoming Movies" category={MovieCategory.Upcoming} />
        <MoviesSection title="Now Playing Movies" category={MovieCategory.NowPlaying} />
      </div>
    </>
  )
}
