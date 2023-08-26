import { FC } from "react";
import { formatNumber } from "../../functions/formatNumber";
import { endingCountLunar } from "../../functions/endingCountLunar";
import { useDistance } from "../../hooks/useDistance";
import { getDay } from "../../functions/date";
import styles from "./asteroidInfo.module.scss"

interface IAsteroidOneDate {
  asteroid: {
    close_approach_date: string;
    miss_distance: {
      kilometers: string;
      lunar: string;
    };
    relative_velocity: {
      kilometers_per_hour: string;
    };
    orbiting_body: string;
  };
}

const AsteroidInfoOneDate: FC<IAsteroidOneDate> = ({ asteroid }) => {
  const { inKm } = useDistance();

  return (
    <ul className={styles.info_one_date + " " + styles.info}>
      <li>
        <span>Дата</span>
        <div>{getDay(asteroid.close_approach_date)}</div>
      </li>
      <li>
        <span>Расстояние</span>{" "}
        <div>
          {inKm
            ? formatNumber(asteroid.miss_distance.kilometers) + " км"
            : formatNumber(asteroid.miss_distance.lunar) +
              " " +
              endingCountLunar(
                Math.round(Number(asteroid.miss_distance.lunar))
              )}
        </div>
      </li>
      <li>
        <span>Скорость</span>
        <div>
          {formatNumber(asteroid.relative_velocity.kilometers_per_hour) +
            " км/ч"}
        </div>
      </li>
      <li>
        <span>Орбита</span>
        <div>{asteroid.orbiting_body}</div>
      </li>
    </ul>
  );
};

export default AsteroidInfoOneDate;
