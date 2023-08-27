import { FC } from "react";
import Header from "../components/Header/Header";
import AsteroidInfo from "../components/AsteroidInfo/AsteroidInfo";
import { useSize } from "../hooks/useSize";
import BasketDesktop from "../components/Basket/BasketDesktop/BasketDesktop";
import BasketMobile from "../components/Basket/BasketMobile/BasketMobile";

const Asteroid: FC = () => {
  const { isDesktop } = useSize();

  return (
    <>
      <Header />
      {isDesktop ? <BasketDesktop /> : <BasketMobile />}
      <AsteroidInfo />
    </>
  );
};

export default Asteroid;
