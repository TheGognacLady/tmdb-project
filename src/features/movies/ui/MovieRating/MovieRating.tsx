import styles from './MovieRating.module.css'

type MovieRatingProps = {
  rating: number
  className?: string
}

export const MovieRating = ({ rating, className }: MovieRatingProps) => {
  const formattedRating = rating.toFixed(1)
  const ratingTone = rating > 7
    ? styles.positive
    : rating >= 5
      ? styles.neutral
      : styles.negative

  return (
    <span className={`${styles.rating} ${ratingTone}${className ? ` ${className}` : ''}`} aria-label={`Rating: ${formattedRating}`}>
      {formattedRating}
    </span>
  )
}
