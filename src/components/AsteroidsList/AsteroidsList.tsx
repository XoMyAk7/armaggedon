import { FC, useState, useEffect } from "react";
import styles from "./asteroidsList.module.scss";
import AsteroidsItem from "../AsteroidsItem/AsteroidsItem";
import { IAsteroid } from "../../types/asteroids.types";
import { getToDay, getNextDay } from "../../functions/date";

const AsteroidsList: FC = () => {
  const [day, setDay] = useState(getToDay());
  const [inKm, setInKm] = useState(true);
  const [asteroids, setAsteroids] = useState<IAsteroid[]>([]);
  const [getAsteroids, setGetAsteroids] = useState(
    "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +
      day +
      "&end_date=" +
      day +
      "&api_key=hI9X0pnC7yklZdwpRSE7P6zV10zyJsTbIE6WscTl"
  );
  useEffect(() => {
    try {
      fetch(getAsteroids)
        .then(res => res.json())
        .then(res => {
          setDay(getNextDay(day));
          setGetAsteroids(res.links.next);
          setAsteroids([...asteroids, ...res.near_earth_objects[day]]);
        });
    } catch {}
  }, []);
  console.log(asteroids);

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <h2>Ближайшие подлёты астероидов</h2>
        <div className={styles.distance}>
          <span
            className={inKm ? styles.active : styles.not_active}
            onClick={() => setInKm(true)}
          >
            в километрах
          </span>
          <pre> | </pre>
          <span
            className={!inKm ? styles.active : styles.not_active}
            onClick={() => setInKm(false)}
          >
            в лунных орбитах
          </span>
        </div>
      </div>
      {asteroids.map(asteroid => (
        <AsteroidsItem key={asteroid.name} asteroid={asteroid} inKm={inKm} /> // key={asteroid.estimated_diameter.name}
      ))}
    </div>
  );
};

export default AsteroidsList;
