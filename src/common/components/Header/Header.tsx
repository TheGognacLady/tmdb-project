import { Link, NavLink, useMatch } from 'react-router-dom'
import tmdbLogo from '@/assets/tmdb-blue-short.svg'
import { useTheme } from '@/app/model/useTheme'
import { getMoviesCategoryPath, Path } from '@/common/routing/paths'
import { MovieCategory } from '@/features/movies/model'
import styles from './Header.module.css'

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  `${styles.link} ${isActive ? styles.linkActive : ''}`

export const Header = () => {
  const isMoviesCategory = useMatch(Path.Movies) !== null
  const { theme, toggleTheme } = useTheme()
  const themeButtonLabel = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logoLink} to={Path.Main} aria-label="Go to Main page">
          <img className={styles.logo} src={tmdbLogo} alt="The Movie Database (TMDB)" />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <NavLink className={navLinkClassName} to={Path.Main} end>
            Main
          </NavLink>
          <span className={styles.separator} aria-hidden="true">|</span>
          <NavLink
            className={({ isActive }) =>
              navLinkClassName({ isActive: isActive || isMoviesCategory })
            }
            to={getMoviesCategoryPath(MovieCategory.Popular)}
            aria-current={isMoviesCategory ? 'page' : undefined}
          >
            Movie Categories
          </NavLink>
          <span className={styles.separator} aria-hidden="true">|</span>
          <NavLink className={navLinkClassName} to={Path.FilteredMovies}>
            Filtered Movies
          </NavLink>
          <span className={styles.separator} aria-hidden="true">|</span>
          <NavLink className={navLinkClassName} to={Path.Search}>
            Search
          </NavLink>
          <span className={styles.separator} aria-hidden="true">|</span>
          <NavLink className={navLinkClassName} to={Path.Favorites}>
            Favorites
          </NavLink>
        </nav>

        <button
          className={styles.themeButton}
          type="button"
          onClick={toggleTheme}
          aria-label={themeButtonLabel}
          title={themeButtonLabel}
        >
          <span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
        </button>
      </div>
    </header>
  )
}
