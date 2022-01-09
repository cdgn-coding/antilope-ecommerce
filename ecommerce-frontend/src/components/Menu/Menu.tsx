import React from "react";
import styles from "./Menu.module.css";
import Link from "@components/Link";

export interface MenuItemProps {
  label: string;
  path: string;
}

export interface MenuProps {
  items: MenuItemProps[];
}

const MenuItem = ({ label, path }: MenuItemProps) => {
  return (
    <div className={styles.menuItem}>
      <Link href={path}>{label}</Link>
    </div>
  );
};

const Menu = ({ items }: MenuProps) => {
  const renderMenuItem = (item: MenuItemProps) => (
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
