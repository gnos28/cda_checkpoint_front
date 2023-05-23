import React from "react";
import styles from "./Header.module.scss";
import { useContinents } from "../hooks/useContinents";
import { useRouter } from "next/router";
import { Continent, Country } from "../@types";

export default function Header() {
  const router = useRouter();

  const { selection, continents, setSelected, getSelected } = useContinents();

  const goHome = () => {
    setSelected("none", "");
    router.push("/");
  };

  const goToContinent = (continentCode: string) => {
    if (!continentCode) return;

    setSelected("continent", continentCode);
    setSelected("country", "");
    router.push(`/${continentCode}`);
  };

  const getContinentElement = () => {
    const continentSelected = (selection.continent ||
      router.query.continent) as string;

    const continent = getSelected("continent") as Continent[];

    if (!continent.length) return null;

    return (
      <div
        className={styles.menuItem}
        onClick={() =>
          goToContinent(
            typeof continentSelected === "string" ? continentSelected : ""
          )
        }
      >
        <span>&gt;</span>
        {continent[0].name.toUpperCase()}
      </div>
    );
  };

  const getCountryElement = () => {
    const country = getSelected("country") as Country[];

    if (!country.length) return null;

    return (
      <div className={styles.menuItem}>
        <span>&gt;</span>
        {country[0].name.toUpperCase()}
      </div>
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.menuItem} onClick={goHome}>
        HOME
      </div>
      {getContinentElement()}
      {getCountryElement()}
    </header>
  );
}
