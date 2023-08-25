import { FC, useEffect, useState, useMemo, useCallback } from "react";
import { useAsteroidInfo } from "../../hooks/useAsteroidInfo";
import styles from "./asteroidInfo.module.scss";
import { useActions } from "../../hooks/useActions";
import { IAsteroidInfo } from "../../types/asteroids.types";
import { getName } from "../../functions/getName";
import { getDay, getToDay } from "../../functions/date";
import { formatNumber } from "../../functions/formatNumber";
import { useDistance } from "../../hooks/useDistance";
import { endingCountLunar } from "../../functions/endingCountLunar";

const AsteroidInfo: FC = () => {
  const { id } = useAsteroidInfo();
  const [loading, setLoading] = useState(true);
  const { inKm } = useDistance();
  const { setIsInfo, setIdAsteroidInfo } = useActions();
  const [asteroidInfo, setAsteroidInfo] = useState<IAsteroidInfo>(
    {} as IAsteroidInfo
  );
  const urlAsteroid = useMemo(
    () =>
      "https://api.nasa.gov/neo/rest/v1/neo/" +
      id +
      "?api_key=hI9X0pnC7yklZdwpRSE7P6zV10zyJsTbIE6WscTl",
    []
  );

  useEffect(() => {
    fetch(urlAsteroid)
      .then(res => res.json())
      .then(data => setAsteroidInfo(data))
      .finally(() => setLoading(false));
  }, [id]);
  console.log(asteroidInfo);

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
          setIsInfo(false);
          setIdAsteroidInfo("");
        }}
      >
        Вернуться к списку
      </button>
      <div>
        <h2>{getName(asteroidInfo.name)}</h2>
        <div>
          <p>Ближайшее сближение {formatDay()}</p>
          <p>
            Расстояние{" "}
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
          </p>
        </div>
      </div>
    </div>
  );
};

export default AsteroidInfo;
