import { FC, useState, useEffect } from "react";
import styles from "./basket.module.scss";
import { useBacket } from "../../hooks/useBasket";
import AsteroidsItem from "../AsteroidsItem/AsteroidsItem";
import { BsTrash } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useActions } from "../../hooks/useActions";

const Basket: FC = () => {
  const { count, asteroids } = useBacket();
  const { setBasket } = useActions();
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

  return (
    <div className={styles.basket + " " + (e ? styles.basket_up : "")}>
      <div className={styles.basket_header}>
        <div>
          <h2>Корзина</h2>
          <p>{count} астероида</p>
        </div>
        <button>Отправить</button>
      </div>
      <hr />
      <div className={styles.scroll}>
        {asteroids.map(asteroid => (
          <div key={asteroid.id}>
            <AsteroidsItem asteroid={asteroid} isBasket={true} />
            <IconContext.Provider
              value={{
                className: asteroid.is_potentially_hazardous_asteroid
                  ? "icon-bs-trash icon-bs-trash-danger"
                  : "icon-bs-trash",
              }}
            >
              <div onClick={() => setBasket(asteroid)}>
                <BsTrash />
              </div>
            </IconContext.Provider>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Basket;
