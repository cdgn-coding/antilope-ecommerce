import type { NextPage } from "next";
import Head from "next/head";
import Purchases from "@pages/Purchases";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const PurchasesPage: NextPage = () => {
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

      <Purchases />
    </>
  );
};

export default withPageAuthRequired(PurchasesPage);
