import React from "react";
import styles from "./Layout.module.css";
import Header from "@components/Header";
import Menu from "@components/Menu";
import SecondaryMenu from "@components/SecondaryMenu";
import Spinner from "@components/Spinner";
import { Category } from "@models/Category";

export interface LayoutProps {
  useCategoriesBar?: boolean;
  children: React.ReactNode;
  withSecondaryMenu?: boolean;
  withoutCategoryLinks?: boolean;
  onSearch?: (searchTerm: string) => void;
  onSelectCategory?: (category: Category) => void;
  loading?: boolean;
}

const menuItems = [
  { label: "Inicio", path: "/" },
  { label: "Mis compras", path: "/purchases" },
  { label: "Carrito", path: "/cart" },
];

const secondaryMenuItems = [
  { label: "Todos", path: "/", category: Category.ALL },
  { label: "Línea blanca", path: "/?category=WHITE", category: Category.WHITE },
  { label: "Línea marrón", path: "/?category=BROWN", category: Category.BROWN },
  { label: "Línea gris", path: "/?category=GRAY", category: Category.GRAY },
  {
    label: "Pequeños electrodomésticos",
    path: "/?category=SMALL_APPS",
    category: Category.SMALL_APPS,
  },
];

const Layout = (props: LayoutProps) => {
  const {
    children,
    withSecondaryMenu,
    loading,
    withoutCategoryLinks,
    onSelectCategory = () => {},
    onSearch,
  } = props;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const onClickMenuButton = React.useCallback(
    () => setIsMenuOpen(!isMenuOpen),
    [isMenuOpen]
  );
  const menuStateClass = isMenuOpen ? styles.menuOpen : "";

  return (
    <div className={`${styles.container} ${menuStateClass}`}>
      <div className={styles.menuContainer}>
        <Menu items={menuItems} />
      </div>
      <div className={styles.contentContainer}>
        <Header
          onClickMenuButton={onClickMenuButton}
          isMenuOpen={isMenuOpen}
          searchPlaceholder="Buscar producto"
          onSearch={onSearch}
        />
        {withSecondaryMenu && (
          <SecondaryMenu
            items={secondaryMenuItems}
            withoutLinks={withoutCategoryLinks}
            onCategoryClick={onSelectCategory}
          />
        )}
        {!loading && children}
        {loading && (
          <div className={styles.layoutSpinner}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
