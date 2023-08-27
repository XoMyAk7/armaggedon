import { FC, useEffect } from "react";
import Header from "../components/Header/Header";
import { useActions } from "../hooks/useActions";
import AsteroidsList from "../components/AsteroidsList/AsteroidsList";
import { useSize } from "../hooks/useSize";
import BasketDesktop from "../components/Basket/BasketDesktop/BasketDesktop";
import BasketMobile from "../components/Basket/BasketMobile/BasketMobile";

const Home: FC = () => {
  const { setSize } = useActions();
  const {isDesktop} = useSize()

  const handleSubscribe = () => {
    setSize(window.innerWidth);
  };
  const onSubscribe = () => {
    window.addEventListener("resize", handleSubscribe);
  };
  const offSubscribe = () =>
    window.removeEventListener("resize", handleSubscribe);

  useEffect(() => {
    onSubscribe();

    return () => offSubscribe();
  }, []);

  return (
    <>
      <Header />
      {isDesktop ? <BasketDesktop /> : <BasketMobile />}
      <AsteroidsList />
    </>
  );
};

export default Home;
