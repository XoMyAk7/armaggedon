import { FC, useEffect, useState } from 'react'
import styles from "./earth.module.scss"

const Earth: FC = () => {
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
    <img
        src="../src/assets/earth.png"
        className={styles.earth_img + " " + (e ? styles.earth_up : "")}
      />
  )
}

export default Earth