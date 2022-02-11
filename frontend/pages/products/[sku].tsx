import type { NextPageContext } from "next";
import Head from "next/head";
import ProductDetail from "@pages/ProductDetail";

export const getServerSideProps = async (ctx: NextPageContext) => {
  return {
    props: {
      sku: ctx.query.sku,
    },
  };
};

const Product = ({ sku }: { sku: string }) => {
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

      <ProductDetail sku={sku} />
    </>
  );
};

export default Product;
