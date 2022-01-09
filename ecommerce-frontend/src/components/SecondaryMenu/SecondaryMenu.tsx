import React from "react";
import styles from "./SecondaryMenu.module.css";
import { Category } from "@models/Category";
import SecondaryMenuButton from "./SecondaryMenuButton";

export interface SecondaryMenuItem {
  label: string;
  path: string;
  category: Category;
}

export interface SecondaryMenuProps {
  items: SecondaryMenuItem[];
  withoutLinks?: boolean;
  onCategoryClick?: (category: Category) => void;
}

const SecondaryMenu = ({
  items = [],
  withoutLinks = false,
  onCategoryClick = () => {},
}: SecondaryMenuProps) => {
  const renderItem = (item: SecondaryMenuItem) => {
    const onClick = () => onCategoryClick(item.category);
    return (
      <SecondaryMenuButton
        key={item.path}
        label={item.label}
        path={item.path}
        onClick={onClick}
        withoutLinks={withoutLinks}
      />
    );
  };

  return <div className={styles.container}>{items.map(renderItem)}</div>;
};

export default SecondaryMenu;
