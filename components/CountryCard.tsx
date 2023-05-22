import React from "react";
import styles from "./CountryCard.module.scss";
import { Country } from "../@types";
import { useRouter } from "next/router";
import { useContinents } from "../hooks/useContinents";

type CountryCardProps = {
  country: Country;
};

const CountryCard = (props: CountryCardProps) => {
  const router = useRouter();

  const { setSelected, selection } = useContinents();

  const handleClick = () => {
    setSelected("country", props.country.code);
    router.push(`${selection.continent}/${props.country.code || ""}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.flag}>{props.country.emoji}</div>

      <div className={styles.name}>{props.country.name}</div>
    </div>
  );
};

export default CountryCard;
