import React from "react";
import styles from "./Menu.module.css";
import Link from "@components/Link";

export interface MenuItem {
  label: string;
  path: string;
}

export interface MenuProps {
  items: MenuItem[];
}

const MenuItem = ({ label, path }: MenuItem) => {
  return (
    <div className={styles.menuItem}>
      <Link href={path}>{label}</Link>
    </div>
  );
};

const Menu = ({ items }: MenuProps) => {
  const renderMenuItem = (item: MenuItem) => (
    <li key={item.path}>
      <MenuItem {...item} />
    </li>
  );

  return (
    <nav className={styles.container}>
      <ul className={styles.innerContainer}>{items.map(renderMenuItem)}</ul>
    </nav>
  );
};

export default Menu;
