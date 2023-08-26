import { FC } from "react";
import styles from "./main.module.scss";
import AsteroidsList from "../AsteroidsList/AsteroidsList";
import { useAsteroidInfo } from "../../hooks/useAsteroidInfo";
import AsteroidInfo from "../AsteroidInfo/AsteroidInfo";
import Basket from "../Basket/Basket";

const Main: FC = () => {
  const { isInfo } = useAsteroidInfo();

  return (
    <main className={styles.main}>
      {isInfo ? <AsteroidInfo /> : <AsteroidsList />}
      <Basket />
    </main>
  );
};

export default Main;
