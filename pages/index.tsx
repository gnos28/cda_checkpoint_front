import Head from "next/head";
import { ReactElement, useEffect } from "react";
import type { NextPageWithLayout } from "./_app";
import styles from "../styles/index.module.scss";
import Layout from "../components/Layout";
import { useContinents } from "../hooks/useContinents";
import { worldAPI } from "../api/worldAPI";
import { Continent as ContinentType } from "../@types";
import Continent from "../components/Continent";

type HomeProps = {
  continents_ssr: ContinentType[];
};
const Home: NextPageWithLayout<HomeProps> = (props) => {
  const { continents, setContinents, refreshContinents } = useContinents();
  if (props.continents_ssr.length) setContinents(props.continents_ssr);

  useEffect(() => {
    if (!continents.length) refreshContinents();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>CHECKPOINT WCS CDA</title>
      </Head>
      {continents.map((continent) => (
        <Continent key={continent.code} continent={continent} />
      ))}
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

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
