import React from "react";
import { Continent } from "../@types";
import styles from "./Continent.module.scss";
import { useRouter } from "next/router";
import { useContinents } from "../hooks/useContinents";

type ContinentProps = {
  continent: Continent;
};
const Continent = (props: ContinentProps) => {
  const router = useRouter();

  const { setSelected } = useContinents();

  const handleClick = () => {
    setSelected("continent", props.continent.code);
    router.push(`${props.continent.code || ""}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <h2>{props.continent.name}</h2>
      <div className={styles.coutriesCount}>
        {props.continent.countries.length} countries
      </div>
      <div>code : {props.continent.code}</div>
    </div>
  );
};

export default Continent;
