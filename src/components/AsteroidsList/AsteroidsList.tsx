import { FC, useState, useEffect } from "react";
import styles from "./asteroidsList.module.scss";
import AsteroidsItem from "../AsteroidsItem/AsteroidsItem";
import { IAsteroid } from "../../types/asteroids.types";
import { getToDay, getNextDay } from "../../functions/date";
import { useDistance } from "../../hooks/useDistance";
import { useActions } from "../../hooks/useActions";
import React from "react";
import AsteroidDistance from "../AsteroidDistance/AsteroidDistance";

const AsteroidsList: FC = () => {
  const {inKm} = useDistance()
  const {setDistance} = useActions()
  const [day, setDay] = useState(getToDay());
  const [asteroids, setAsteroids] = useState<IAsteroid[]>([]);
  const [fetching, setFetching] = useState(true);
  const [getAsteroids, setGetAsteroids] = useState(
    "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +
      day +
      "&end_date=" +
      day +
      "&api_key=hI9X0pnC7yklZdwpRSE7P6zV10zyJsTbIE6WscTl"
  );
  useEffect(() => {
    if (fetching) {
      fetch(getAsteroids)
        .then(res => res.json())
        .then(res => {
          setAsteroids([...asteroids, ...res.near_earth_objects[day]]);
          setDay(getNextDay(day));
          setGetAsteroids(res.links.next);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      400
    ) {
      setFetching(true);
    }
  };

  const Asteroids = React.memo(() => {
    return (asteroids.map(asteroid => (
      <AsteroidsItem key={asteroid.id} asteroid={asteroid} isBasket={false} />
    )))
  })

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <h2>Ближайшие подлёты астероидов</h2>
        <AsteroidDistance />
      </div>
      <Asteroids />
    </div>
  );
};

export default AsteroidsList;
