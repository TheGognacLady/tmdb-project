import styles from './LinearProgress.module.css'

export const LinearProgress = () => (
  <div className={styles.progress} role="progressbar" aria-label="Loading movie data">
    <span className={styles.bar} aria-hidden="true" />
  </div>
)
