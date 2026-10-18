import styles from './MovieDetailsSkeleton.module.css'

export const MovieDetailsSkeleton = () => (
  <div className={styles.content} role="status" aria-label="Loading movie details">
    <div className={styles.poster} aria-hidden="true" />
    <div className={styles.details} aria-hidden="true">
      <div className={styles.general}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <span className={styles.title} />
            <span className={styles.backButton} />
          </div>
          <div className={styles.meta}>
            <span className={styles.year} />
            <span className={styles.rating} />
            <span className={styles.runtime} />
          </div>
        </div>
        <div className={styles.overview}>
          <span className={styles.overviewLine} />
          <span className={styles.overviewLine} />
          <span className={styles.overviewLineShort} />
        </div>
      </div>
      <div className={styles.genres}>
        <span className={styles.genresTitle} />
        <div className={styles.genresList}>
          <span className={styles.genre} />
          <span className={styles.genre} />
          <span className={styles.genre} />
        </div>
      </div>
    </div>
  </div>
)
