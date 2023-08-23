import { FC } from 'react'
import styles from './header.module.scss'

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>ARMAGEDDON 2023</h1>
      <h2 className={styles.descr}>ООО Команда им. Б. Уиллиса”. <br />
          Взрываем астероиды с 1998 года.</h2>
    </header>
  )
}

export default Header