import styles from './MovieCardSkeleton.module.css'

export const MovieCardSkeleton = () => (
  <article className={styles.card} aria-hidden="true">
    <div className={styles.posterFrame}>
      <span className={styles.favorite} />
      <span className={styles.rating} />
    </div>
    <span className={styles.title} />
  </article>
)
