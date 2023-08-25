import { FC, useEffect, useState } from "react";
import styles from "./main.module.scss";
import AsteroidsList from "../AsteroidsList/AsteroidsList";
import Basket from "../Basket/Basket";
import { useAsteroidInfo } from "../../hooks/useAsteroidInfo";
import AsteroidInfo from "../AsteroidInfo/AsteroidInfo";

const Main: FC = () => {
  const [e, setE] = useState(0);
  const { isInfo } = useAsteroidInfo();
  const scrollHandler = (e: any) => {
    setE(e.target.documentElement.scrollTop);
  };
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <main className={styles.main}>
      <img
        src="../src/assets/earth.png"
        className={styles.earth_img + " " + (e ? styles.earth_up : "")}
      />

      {isInfo ? <AsteroidInfo /> : <AsteroidsList />}
      <Basket />
    </main>
  );
};

export default Main;
