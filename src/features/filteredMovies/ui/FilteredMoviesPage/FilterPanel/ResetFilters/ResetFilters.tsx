import styles from './ResetFilters.module.css'

type ResetFiltersProps = {
  onReset: () => void
}

export const ResetFilters = ({ onReset }: ResetFiltersProps) => (
  <div className={styles.actions}>
    <button className={styles.resetButton} type="button" onClick={onReset}>
      Reset Filters
    </button>
  </div>
)
