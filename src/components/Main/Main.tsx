import { FC } from 'react'
import styles from './main.module.scss'
import AsteroidsList from '../AsteroidsList/AsteroidsList'

const Main: FC = () => {
  return (
    <main className={styles.main}>
      <img src="../src/assets/earth.png" className={styles.earth_img}/>
      <AsteroidsList />
    </main>
  )
}

export default Main