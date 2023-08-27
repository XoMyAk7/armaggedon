import { FC, useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAsteroidInfo } from "../../hooks/useAsteroidInfo";
import styles from "./asteroidInfo.module.scss";
import { useActions } from "../../hooks/useActions";
import { IAsteroidInfo } from "../../types/asteroids.types";
import { getName } from "../../functions/getName";
import { getDay, getToDay } from "../../functions/date";
import { formatNumber } from "../../functions/formatNumber";
import { useDistance } from "../../hooks/useDistance";
import { endingCountLunar } from "../../functions/endingCountLunar";
import { diameterIsKm } from "../../functions/diameterIsKm";
import { getDiameter } from "../../functions/getDiameter";
import AsteroidInfoOneDate from "../AsteroidInfoOneDate.tsx/AsteroidInfoOneDate";
import AsteroidDistance from "../AsteroidDistance/AsteroidDistance";

const AsteroidInfo: FC = () => {
  const navigate = useNavigate();
  const { id } = useAsteroidInfo();
  const [loading, setLoading] = useState(true);
  const { inKm } = useDistance();
  const { setIdAsteroidInfo } = useActions();
  const [asteroidInfo, setAsteroidInfo] = useState<IAsteroidInfo>(
    {} as IAsteroidInfo
  );
  const urlAsteroid = useMemo(
    () =>
      "https://api.nasa.gov/neo/rest/v1/neo/" +
      id +
      "?api_key=hI9X0pnC7yklZdwpRSE7P6zV10zyJsTbIE6WscTl",
    [id]
  );

  useEffect(() => {
    fetch(urlAsteroid)
      .then(res => res.json())
      .then(data => setAsteroidInfo(data))
      .finally(() => setLoading(false));
  }, [urlAsteroid]);

  const getIndexNear = useMemo(() => {
    if (!loading) {
      return asteroidInfo.close_approach_data.findIndex(
        data => data.close_approach_date >= getToDay()
      );
    }
    return 0;
  }, [loading]);

  const formatDay = useCallback(() => {
    if (!loading) {
      return getDay(
        asteroidInfo.close_approach_data[getIndexNear].close_approach_date
      );
    }
    return "";
  }, [loading]);

  return loading ? (
    ""
  ) : (
    <div className={styles.asteroid_info}>
      <button
        onClick={() => {
          setIdAsteroidInfo("");
          navigate("/");
        }}
        className={styles.button}
      >
        Вернуться к списку
      </button>
      <div className={styles.asteroid_distance}>
        <pre>Расстояние </pre>
        <AsteroidDistance />
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>Астероид {getName(asteroidInfo.name)}</h2>
        <ul>
          <li>
            <span>Ближайшее сближение</span>
            <div>{formatDay()}</div>
          </li>
          <li>
            <span>Расстояние</span>{" "}
            <div>
              {inKm
                ? formatNumber(
                    asteroidInfo.close_approach_data[getIndexNear].miss_distance
                      .kilometers
                  ) + " км"
                : formatNumber(
                    asteroidInfo.close_approach_data[getIndexNear].miss_distance
                      .lunar
                  ) +
                  " " +
                  endingCountLunar(
                    Math.round(
                      Number(
                        asteroidInfo.close_approach_data[getIndexNear]
                          .miss_distance.lunar
                      )
                    )
                  )}
            </div>
          </li>
          <li>
            <span>Диаметр</span>
            <div>
              {diameterIsKm(asteroidInfo.estimated_diameter)
                ? getDiameter(asteroidInfo.estimated_diameter) + " км"
                : getDiameter(asteroidInfo.estimated_diameter) + " м"}
            </div>
          </li>
          <li>
            <span>Скорость</span>
            <div>
              {formatNumber(
                asteroidInfo.close_approach_data[getIndexNear].relative_velocity
                  .kilometers_per_hour
              ) + " км/ч"}
            </div>
          </li>
          <li>
            <span>Орбита</span>
            <div>
              {asteroidInfo.close_approach_data[getIndexNear].orbiting_body}
            </div>
          </li>
          <li>
            <span>Опасность</span>
            <div>
              {asteroidInfo.is_potentially_hazardous_asteroid
                ? "Опасен"
                : "Не опасен"}
            </div>
          </li>
        </ul>
      </div>
      <h2>Список всех сближений:</h2>
      <ul>
        {asteroidInfo.close_approach_data.map(asteroid => (
          <AsteroidInfoOneDate
            asteroid={asteroid}
            key={asteroid.close_approach_date}
          />
        ))}
      </ul>
    </div>
  );
};

export default AsteroidInfo;
