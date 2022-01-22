import React from "react";
import useRouter from "@hooks/useRouter";
import secondaryMenuItems from "@constants/secondaryMenu";
import menuItems from "@constants/menuItems";
import Layout from "@components/Layout";
import usePurchases from "@hooks/usePurchases";

const MyPurchases = () => {
  const { push } = useRouter();
  const onSearch = (query: string) => push(`/?search=${query}`);
  const { loading } = usePurchases();
  return (
    <Layout
      menuItems={menuItems}
      withSecondaryMenu
      secondaryMenuItems={secondaryMenuItems}
      onSearch={onSearch}
      loading={loading}
    ></Layout>
  );
};

export default MyPurchases;
