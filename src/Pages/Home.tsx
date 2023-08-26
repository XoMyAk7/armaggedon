import { FC, useEffect } from "react";
import Header from "../components/Header/Header";
import Basket from "../components/Basket/Basket";
import Main from "../components/Main/Main";
import { useActions } from "../hooks/useActions";

const Home: FC = () => {
  const { setSize } = useActions();

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
      <Basket />
      <Main />
    </>
  );
};

export default Home;
