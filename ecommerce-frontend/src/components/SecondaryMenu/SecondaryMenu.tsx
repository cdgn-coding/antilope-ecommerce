import React from "react";
import styles from "./SecondaryMenu.module.css";
import { Category } from "@models/Category";
import SecondaryMenuButton from "./SecondaryMenuButton";

export interface SecondaryMenuItem {
  label: string;
  path: string;
  value: string;
}

export interface SecondaryMenuProps {
  items: SecondaryMenuItem[];
  withoutLinks?: boolean;
  onSelectItem?: (value: string) => void;
}

const SecondaryMenu = ({
  items = [],
  withoutLinks = false,
  onSelectItem = () => {},
}: SecondaryMenuProps) => {
  const renderItem = (item: SecondaryMenuItem) => {
    const onClick = () => onSelectItem(item.value);
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
