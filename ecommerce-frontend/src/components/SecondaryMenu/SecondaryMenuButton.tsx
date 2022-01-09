import React from "react";
import Button from "@components/Button";
import Link from "@components/Link";
import { Category } from "@models/Category";
import styles from "./SecondaryMenu.module.css";

export interface SecondaryMenuButtonProps {
  label: string;
  path: string;
  onClick: () => void;
  withoutLinks?: boolean;
}

const SecondaryMenuButtonWithLink = ({
  label,
  path,
}: SecondaryMenuButtonProps) => (
  <div className={styles.item}>
    <Link href={path}>
      <Button type="primary">{label}</Button>
    </Link>
  </div>
);

const SecondaryMenuButtonWithoutLink = ({
  label,
  onClick,
}: SecondaryMenuButtonProps) => {
  return (
    <div className={styles.item}>
      <Button type="primary" onClick={onClick}>
        {label}
      </Button>
    </div>
  );
};

const SecondaryMenuButton = (props: SecondaryMenuButtonProps) => {
  if (props.withoutLinks) {
    return <SecondaryMenuButtonWithoutLink {...props} />;
  }

  return <SecondaryMenuButtonWithLink {...props} />;
};

export default SecondaryMenuButton;
