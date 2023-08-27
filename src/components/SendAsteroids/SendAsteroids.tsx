import { FC, useEffect, useState } from "react";
import AsteroidsItem from "../AsteroidsItem/AsteroidsItem";
import styles from "./sendAsteroids.module.scss";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { IAsteroid } from "../../types/asteroids.types";
import { useBacket } from "../../hooks/useBasket";

const SendAsteroids: FC = () => {
  const { resetBasket } = useActions();
  const { asteroids } = useBacket();
  const [sendAsteroids, setSendAsteroids] = useState<IAsteroid[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSendAsteroids(asteroids);
    resetBasket();
  }, []);

  return (
    <div className={styles.send_asteroids}>
      <span className={styles.send}>Заказ отправлен!</span>
      <div className={styles.asteroids}>
        {sendAsteroids.map(asteroid => (
          <div key={asteroid.id}>
            <AsteroidsItem asteroid={asteroid} isBasket={true} />
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Сделать новый заказ
      </button>
    </div>
  );
};

export default SendAsteroids;
