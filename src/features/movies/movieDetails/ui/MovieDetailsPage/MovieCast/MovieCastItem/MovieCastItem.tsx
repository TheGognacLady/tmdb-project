import type { CastMember } from '@/features/movies/movieDetails/model'
import styles from './MovieCastItem.module.css'

type MovieCastItemProps = {
  actor: CastMember
}

export const MovieCastItem = ({ actor }: MovieCastItemProps) => (
  <article className={styles.card}>
    <div className={styles.avatarFrame}>
      {actor.profile_path ? (
        <img
          className={styles.avatar}
          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
          alt={`${actor.name} portrait`}
          loading="lazy"
        />
      ) : (
        <span className={styles.avatarFallback} role="img" aria-label={`${actor.name} portrait unavailable`}>
          No photo
        </span>
      )}
    </div>
    <div className={styles.info}>
      <p className={styles.name}>{actor.name}</p>
      <p className={styles.character}>{actor.character?.trim() || 'Unknown role'}</p>
    </div>
  </article>
)
