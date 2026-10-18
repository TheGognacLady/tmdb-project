import styles from './MovieCastSkeleton.module.css'

export const MovieCastSkeleton = () => (
  <article className={styles.card} aria-hidden="true">
    <div className={styles.avatar} />
    <div className={styles.info}>
      <span className={styles.name} />
      <span className={styles.character} />
    </div>
  </article>
)
