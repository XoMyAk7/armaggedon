import { FC, useMemo, useState } from "react";
import styles from "./asteroidItem.module.scss";
import { Link } from "react-router-dom";
import { IAsteroid } from "../../types/asteroids.types";
import { getDay } from "../../functions/date";
import { getName } from "../../functions/getName";
import { IoMdWarning } from "react-icons/io";
import { IconContext } from "react-icons";
import { useActions } from "../../hooks/useActions";
import { formatNumber } from "../../functions/formatNumber";
import { useBacket } from "../../hooks/useBasket";
import { useDistance } from "../../hooks/useDistance";
import { endingCountLunar } from "../../functions/endingCountLunar";
import { diameterIsKm } from "../../functions/diameterIsKm";
import { getDiameter } from "../../functions/getDiameter";

interface IAsteroidsItem {
  asteroid: IAsteroid;
  isBasket: boolean;
}

const AsteroidsItem: FC<IAsteroidsItem> = ({ asteroid, isBasket }) => {
  const { asteroids, isSend } = useBacket();
  const { setBasket, setIdAsteroidInfo } = useActions();
  const { inKm } = useDistance();
  const [inBasket, setInBasket] = useState(false);
  const asteroidDiameter = useMemo(() => asteroid.estimated_diameter, []);
  const km = useMemo(
    () =>
      formatNumber(asteroid.close_approach_data[0].miss_distance.kilometers),
    []
  );
  const lunar = useMemo(
    () => formatNumber(asteroid.close_approach_data[0].miss_distance.lunar),
    []
  );
  const isKm = useMemo(() => diameterIsKm(asteroidDiameter), []);
  const diameter = useMemo(
    () =>
      diameterIsKm(asteroidDiameter)
        ? getDiameter(asteroidDiameter.kilometers)
        : getDiameter(asteroidDiameter.meters),
    []
  );

  useMemo(() => {
    const index = asteroids.findIndex(a => a.id === asteroid.id);
    if (index !== -1) {
      setInBasket(true);
    } else {
      setInBasket(false);
    }
  }, [asteroids]);

  return (
    <div className={styles.asteroid}>
      <h3 className={styles.data}>
        {getDay(asteroid.close_approach_data[0].close_approach_date)}
      </h3>
      <div className={styles.asteroid_info}>
        <div className={styles.distance}>
          <span>
            {inKm ? km + " км" : lunar + " " + endingCountLunar(Number(lunar))}
          </span>
          <img src="./src/assets/arrow.svg" alt="" />
        </div>
        <img
          src="./src/assets/asteroid.png"
          alt="123"
          className={
            isKm
              ? diameter > 0.1
                ? ""
                : styles.asteroid_mini
              : diameter > 100
              ? ""
              : styles.asteroid_mini
          }
        />
        <div className={styles.asteroid_descr}>
          <Link
            className={styles.asteroid_name}
            onClick={() => {
              setIdAsteroidInfo(asteroid.id);
            }}
            to={"/" + asteroid.id}
          >
            {getName(asteroid.name)}
          </Link>
          <span className={styles.asteroid_diameter}>
            Ø {diameter} {isKm ? " км" : " м"}{" "}
          </span>
        </div>
      </div>
      <div className={styles.asteroid_footer}>
        {isBasket ? (
          ""
        ) : (
          <button
            className={
              styles.mini_button +
              (inBasket ? " " + styles.inBasket : "") +
              (isSend ? " " + styles.mini_button_send : "")
            }
            onClick={() => {
              setInBasket(!inBasket);
              setBasket(asteroid);
            }}
          >
            {inBasket ? "В КОРЗИНЕ" : "ЗАКАЗАТЬ"}
          </button>
        )}

        {asteroid.is_potentially_hazardous_asteroid ? (
          <span className={styles.danger}>
            {
              <IconContext.Provider value={{ color: "yellow", size: "16" }}>
                <div>
                  <IoMdWarning />
                </div>
              </IconContext.Provider>
            }
            <pre> Опасен</pre>
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AsteroidsItem;
