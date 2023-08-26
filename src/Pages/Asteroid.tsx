import { FC } from 'react'
import Header from '../components/Header/Header'
import AsteroidInfo from '../components/AsteroidInfo/AsteroidInfo'
import Basket from '../components/Basket/Basket'

const Asteroid: FC = () => {
  return (
    <>
      <Header />
      <Basket />
      <AsteroidInfo />
    </>
  )
}

export default Asteroid