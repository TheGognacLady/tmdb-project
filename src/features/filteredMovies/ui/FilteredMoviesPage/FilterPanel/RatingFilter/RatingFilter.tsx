import type { ChangeEvent } from 'react'
import { RangeInput } from './RangeInput/RangeInput'
import styles from './RatingFilter.module.css'

type RatingFilterProps = {
  minRating: number
  maxRating: number
  onChange: (minRating: number, maxRating: number) => void
}

export const RatingFilter = ({ minRating, maxRating, onChange }: RatingFilterProps) => {
  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextMinRating = Math.min(Number(event.target.value), maxRating)
    onChange(nextMinRating, maxRating)
  }

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextMaxRating = Math.max(Number(event.target.value), minRating)
    onChange(minRating, nextMaxRating)
  }

  return (
    <div className={styles.ratingFilter}>
      <div className={styles.header}>
        <span className={styles.label}>Rating</span>
        <span className={styles.values} aria-live="off">
          {minRating.toFixed(1)} - {maxRating.toFixed(1)}
        </span>
      </div>

      <div className={`${styles.ranges} ${minRating === maxRating ? styles.overlapping : ''}`}>
        <div className={styles.track} aria-hidden="true" />
        <div
          className={styles.selectedRange}
          style={{ left: `${minRating * 10}%`, right: `${(10 - maxRating) * 10}%` }}
          aria-hidden="true"
        />
        <RangeInput
          className={`${styles.rangeInput} ${styles.minimum}`}
          value={minRating}
          ariaLabel="Minimum rating"
          onChange={handleMinChange}
        />
        <RangeInput
          className={`${styles.rangeInput} ${styles.maximum}`}
          value={maxRating}
          ariaLabel="Maximum rating"
          onChange={handleMaxChange}
        />
      </div>
    </div>
  )
}
