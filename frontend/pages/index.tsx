import type { NextPage } from "next";
import Head from "next/head";
import Explore from "@pages/Explore";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Antilope E-commerce</title>
        <meta
          name="description"
          content="Electrodomesticos, electronicos y más"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Explore />
    </>
  );
};

export default Home;
