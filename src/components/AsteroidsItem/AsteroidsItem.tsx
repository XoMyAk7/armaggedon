import { FC, useEffect, useState } from "react";
import styles from "./asteroidItem.module.scss";
import { IAsteroid } from "../../types/asteroids.types";
import { getDay } from "../../functions/date";
import { getName } from "../../functions/asteroid";
import { IoMdWarning } from "react-icons/io";
import { IconContext } from "react-icons";
import { useActions } from "../../hooks/useActions";
import { formatNumber } from "../../functions/formatNumber";
import { useBacket } from "../../hooks/useBasket";
import { useDistance } from "../../hooks/useDistance";

interface IAsteroidsItem {
  asteroid: IAsteroid;
  isBasket: boolean;
}

const AsteroidsItem: FC<IAsteroidsItem> = ({ asteroid, isBasket }) => {
  const { asteroids, isSend } = useBacket();
  const { setBasket } = useActions();
  const { inKm } = useDistance();
  const [inBasket, setInBasket] = useState(false);
  const [km, setKm] = useState("");
  const [lunar, setLunar] = useState("");
  const asteroidDiameter = asteroid.estimated_diameter;
  const isKm = Number(asteroid.estimated_diameter.kilometers) >= 1;

  const diameter = isKm
    ? Math.round(
        (asteroidDiameter.kilometers.estimated_diameter_max +
          asteroidDiameter.kilometers.estimated_diameter_min) /
          2
      )
    : Math.round(
        (asteroidDiameter.meters.estimated_diameter_max +
          asteroidDiameter.meters.estimated_diameter_min) /
          2
      );

  useEffect(() => {
    const index = asteroids.findIndex(a => a.id === asteroid.id);
    if (index !== -1) {
      setInBasket(true);
    } else {
      setInBasket(false);
    }
  }, [asteroids]);

  useEffect(() => {
    setKm(
      formatNumber(asteroid.close_approach_data[0].miss_distance.kilometers)
    );
    setLunar(formatNumber(asteroid.close_approach_data[0].miss_distance.lunar));
  }, []);

  return (
    <div className={styles.asteroid}>
      <h3 className={styles.data}>
        {getDay(asteroid.close_approach_data[0].close_approach_date)}
      </h3>
      <div className={styles.asteroid_info}>
        <div className={styles.distance}>
          <span>{inKm ? km + " км" : lunar + " лунных орбит"}</span>
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
          <span className={styles.asteroid_name}>{getName(asteroid.name)}</span>
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
