import { FC } from "react";
import { endingCountAsteroids } from "../../../functions/endingCountAsteroids";
import { useBacket } from "../../../hooks/useBasket";
import styles from "./basketMobile.module.scss";
import { useNavigate } from "react-router-dom";

const BasketMobile: FC = () => {
  const { count } = useBacket();
  const navigate = useNavigate();
  return (
    <div className={styles.basket_mobile}>
      <div className={styles.title}>
        <h2>Корзина</h2>
        <p>
          {count} {endingCountAsteroids(count)}
        </p>
      </div>
      <button
        className={count > 0 ? "" : styles.button_zero}
        onClick={() => {
          count > 0 ? (navigate("/m.send")) : "";
        }}
      >
        Отправить
      </button>
    </div>
  );
};

export default BasketMobile;
