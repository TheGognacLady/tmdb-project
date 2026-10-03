import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { RangeInput } from './RangeInput/RangeInput'
import styles from './RatingFilter.module.css'

type RatingFilterProps = {
  minRating: number
  maxRating: number
  onChange: (minRating: number, maxRating: number) => void
}

export const RatingFilter = ({ minRating, maxRating, onChange }: RatingFilterProps) => {
  const [localMinRating, setLocalMinRating] = useState(minRating)
  const [localMaxRating, setLocalMaxRating] = useState(maxRating)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setLocalMinRating(minRating)
    setLocalMaxRating(maxRating)
  }, [minRating, maxRating])

  useEffect(() => () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const scheduleChange = (nextMinRating: number, nextMaxRating: number) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      onChange(nextMinRating, nextMaxRating)
    }, 200)
  }

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextMinRating = Math.min(Number(event.target.value), localMaxRating)
    setLocalMinRating(nextMinRating)
    scheduleChange(nextMinRating, localMaxRating)
  }

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextMaxRating = Math.max(Number(event.target.value), localMinRating)
    setLocalMaxRating(nextMaxRating)
    scheduleChange(localMinRating, nextMaxRating)
  }

  return (
    <div className={styles.ratingFilter}>
      <div className={styles.header}>
        <span className={styles.label}>Rating</span>
        <span className={styles.values} aria-live="off">
          {localMinRating.toFixed(1)} - {localMaxRating.toFixed(1)}
        </span>
      </div>

      <div className={`${styles.ranges} ${localMinRating === localMaxRating ? styles.overlapping : ''}`}>
        <div className={styles.track} aria-hidden="true" />
        <div
          className={styles.selectedRange}
          style={{ left: `${localMinRating * 10}%`, right: `${(10 - localMaxRating) * 10}%` }}
          aria-hidden="true"
        />
        <RangeInput
          className={`${styles.rangeInput} ${styles.minimum}`}
          value={localMinRating}
          ariaLabel="Minimum rating"
          onChange={handleMinChange}
        />
        <RangeInput
          className={`${styles.rangeInput} ${styles.maximum}`}
          value={localMaxRating}
          ariaLabel="Maximum rating"
          onChange={handleMaxChange}
        />
      </div>
    </div>
  )
}
