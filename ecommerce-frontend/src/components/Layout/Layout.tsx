import React from "react";
import styles from "./Layout.module.css";
import Header from "@components/Header";
import Menu, { MenuItemProps } from "@components/Menu";
import SecondaryMenu, { SecondaryMenuItem } from "@components/SecondaryMenu";
import Spinner from "@components/Spinner";

export interface LayoutProps {
  useCategoriesBar?: boolean;
  children: React.ReactNode;
  withSecondaryMenu?: boolean;
  withoutSecondaryMenuLinks?: boolean;
  onSearch?: (searchTerm: string) => void;
  onSelectSecondaryItem?: (value: string) => void;
  loading?: boolean;
  menuItems: MenuItemProps[];
  secondaryMenuItems: SecondaryMenuItem[];
}

const Layout = (props: LayoutProps) => {
  const {
    children,
    withSecondaryMenu,
    loading,
    withoutSecondaryMenuLinks,
    onSelectSecondaryItem = () => {},
    onSearch,
    menuItems,
    secondaryMenuItems,
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
            withoutLinks={withoutSecondaryMenuLinks}
            onSelectItem={onSelectSecondaryItem}
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
