import { FC, useState, useEffect } from "react";
import styles from "./basket.module.scss";
import { useBacket } from "../../hooks/useBasket";
import AsteroidsItem from "../AsteroidsItem/AsteroidsItem";
import { BsTrash } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useActions } from "../../hooks/useActions";
import React from "react";
import { endingCountAsteroids } from "../../functions/endingCountAsteroids";

const Basket: FC = () => {
  const { count, asteroids, isSend } = useBacket();
  const { setBasket, resetBasket, setIsSend } = useActions();
  const [e, setE] = useState(0);
  const scrollHandler = (e: any) => {
    setE(e.target.documentElement.scrollTop);
  };
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const AsteroidsInBasket = React.memo(() => {
    return asteroids.map(asteroid => (
      <div key={asteroid.id}>
        <AsteroidsItem asteroid={asteroid} isBasket={true} />
        <IconContext.Provider
          value={{
            className:
              styles.icon_bs_trash +
              (asteroid.is_potentially_hazardous_asteroid
                ? " " + styles.icon_bs_trash_danger
                : "") +
              (isSend ? " " + styles.icon_bs_trash_not_active : ""),
          }}
        >
          <div onClick={() => setBasket(asteroid)}>
            <BsTrash />
          </div>
        </IconContext.Provider>
      </div>
    ));
  });

  return (
    <div className={styles.basket + " " + (e ? styles.basket_up : "")}>
      <div className={styles.header}>
        <div className={styles.title + (isSend ? " " + styles.title_move : "")}>
          <h2>Корзина</h2>
          <p>{count} {endingCountAsteroids(count)}</p>
        </div>
        {isSend ? (
          <button
            className={isSend ? styles.button_new_order : ""}
            onClick={() => {
              setIsSend();
              resetBasket();
            }}
          >
            Сделать новый заказ
          </button>
        ) : (
          <button
            className={count > 0 ? "" : styles.button_zero}
            onClick={() => setIsSend()}
          >
            Отправить
          </button>
        )}
      </div>
      <hr />
      <span className={styles.send + (isSend ? " " + styles.send_active : "")}>
        Заказ отправлен!
      </span>
      <div
        className={
          styles.asteroids + (isSend ? " " + styles.asteroids_move : "")
        }
      >
        <AsteroidsInBasket />
      </div>
    </div>
  );
};

export default Basket;
