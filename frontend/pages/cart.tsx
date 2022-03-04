import type { NextPage } from "next";
import Head from "next/head";
import Cart from "@pages/Cart";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const CartPage: NextPage = () => {
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

      <Cart />
    </>
  );
};

export default withPageAuthRequired(CartPage);
