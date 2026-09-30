import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>© 2026 Kinopoisk Demo · Data courtesy of TMDB.</p>
      </div>
    </footer>
  )
}
