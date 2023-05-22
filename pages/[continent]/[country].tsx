import React, { ReactElement, useEffect, useState } from "react";
import { useContinents } from "../../hooks/useContinents";
import { Continent, Country } from "../../@types";
import styles from "../../styles/country.module.scss";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { worldAPI } from "../../api/worldAPI";
import { GetStaticPaths } from "next";

type CountryProps = {
  continents_ssr?: Continent[];
};
const country = (props: CountryProps) => {
  const { continents, selection, setContinents, refreshContinents } =
    useContinents();
  if (props.continents_ssr?.length) setContinents(props.continents_ssr);

  const router = useRouter();

  const [country, setCountry] = useState<Country | null>(null);

  const getSelectedCountry = () => {
    const selectedContinent = selection.continent || router.query.continent;

    const filteredContinent = continents.filter(
      (continent) => continent.code === selectedContinent
    );

    if (filteredContinent.length === 0) return;

    const continent = filteredContinent[0];

    const selectedCountry = selection.country || router.query.country;

    const filteredCountry = continent.countries.filter(
      (country) => country.code === selectedCountry
    );

    if (filteredCountry.length === 0) return;

    setCountry(filteredCountry[0]);
  };

  useEffect(() => {
    getSelectedCountry();
  }, [continents, selection]);

  useEffect(() => {
    if (!continents.length) refreshContinents();
  }, []);

  return (
    <div className={styles.container}>
      {country === null ? null : (
        <>
          <h2>{country?.name}</h2>
          <div>{country?.capital}</div>
          <div>{country?.currency}</div>
          <div>{country?.emoji}</div>
        </>
      )}
    </div>
  );
};

country.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default country;

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

  const codes = continents_ssr
    .map((continent) =>
      continent.countries.map((country) => ({
        continentCode: continent.code,
        countryCode: country.code,
      }))
    )
    .flat()
    // .filter((_, index) => index < 100);

  return {
    paths: codes.map((code) => ({
      params: {
        continent: code.continentCode,
        country: code.countryCode,
      },
    })),
    fallback: true, // false or "blocking"
  };
};
