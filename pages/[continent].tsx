import React, { ReactElement, useEffect, useState } from "react";
import { useContinents } from "../hooks/useContinents";
import { Continent } from "../@types";
import styles from "../styles/continent.module.scss";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import CountryCard from "../components/CountryCard";
import { worldAPI } from "../api/worldAPI";
import { GetStaticPaths } from "next";

type ContinentProps = {
  continents_ssr?: Continent[];
};
const continent = (props: ContinentProps) => {
  const { continents, selection, setContinents, refreshContinents } =
    useContinents();
  if (props.continents_ssr?.length) setContinents(props.continents_ssr);

  const router = useRouter();

  const [continent, setContinent] = useState<Continent | null>(null);

  useEffect(() => {
    const selectedContinent = selection.continent || router.query.continent;

    const filteredContinent = continents.filter(
      (continent) => continent.code === selectedContinent
    );

    if (filteredContinent.length > 0) setContinent(filteredContinent[0]);
  }, [continents, selection]);

  useEffect(() => {
    if (!continents.length) refreshContinents();
  }, []);

  return (
    <div className={styles.container}>
      <h2>{continent?.name}</h2>
      <div className={styles.countryListContainer}>
        {continent &&
          continent.countries.map((country) => (
            <CountryCard key={country.code} country={country} />
          ))}
      </div>
    </div>
  );
};

continent.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default continent;

export async function getStaticProps() {
  const continents_ssr = await worldAPI.getContinents("ssr");

  return {
    props: {
      continents_ssr,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 3600, // In seconds
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const continents_ssr = await worldAPI.getContinents("ssr");

  return {
    paths: continents_ssr.map((continent) => ({
      params: {
        continent: continent.code,
      },
    })),
    fallback: true, // false or "blocking"
  };
};
