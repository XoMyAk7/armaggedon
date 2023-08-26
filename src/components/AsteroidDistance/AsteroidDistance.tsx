import { FC } from 'react'
import { useDistance } from '../../hooks/useDistance'
import { useActions } from '../../hooks/useActions'
import styles from './asteroidDistance.module.scss'

const AsteroidDistance: FC = () => {
  const {inKm} = useDistance()
  const {setDistance} = useActions()
  return (
    <div className={styles.distance}>
          <span
            className={inKm ? styles.active : styles.not_active}
            onClick={() => setDistance(true)}
          >
            в километрах
          </span>
          <pre> | </pre>
          <span
            className={!inKm ? styles.active : styles.not_active}
            onClick={() => setDistance(false)}
          >
            в лунных орбитах
          </span>
        </div>
  )
}

export default AsteroidDistance