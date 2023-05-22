import React from "react";
import styles from "./Header.module.scss";
import { useContinents } from "../hooks/useContinents";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const { selection, continents, setSelected } = useContinents();

  const goHome = () => {
    setSelected("continent", "");
    setSelected("country", "");
    router.push("/");
  };

  const goToContinent = (continentCode: string) => {
    if (!continentCode) return;

    setSelected("continent", continentCode);
    setSelected("country", "");
    router.push(`/${continentCode}`);
  };

  const getContinentElement = () => {
    if (!selection.continent && !router.query.continent) return null;

    const continentSelected = selection.continent || router.query.continent;

    const continent = continents.filter(
      (continent) => continent.code === continentSelected
    );

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
    if (
      (!selection.continent && !router.query.continent) ||
      (!selection.country && !router.query.country)
    )
      return null;

    const continentSelected = selection.continent || router.query.continent;

    const continent = continents.filter(
      (continent) => continent.code === continentSelected
    );

    if (!continent.length) return null;

    const countrySelected = selection.country || router.query.country;

    const country = continent[0].countries.filter(
      (country) => country.code === countrySelected
    );

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
