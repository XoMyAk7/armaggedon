import { FC } from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.title} to={("/")}>ARMAGEDDON 2023</Link>
      <h2 className={styles.descr}>
        ООО "Команда им. Б. Уиллиса”. <br />
        Взрываем астероиды с 1998 года.
      </h2>
    </header>
  );
};

export default Header;
