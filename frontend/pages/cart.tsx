import type { NextPage } from "next";
import Head from "next/head";
import Cart from "@pages/Cart";

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

export default CartPage;
