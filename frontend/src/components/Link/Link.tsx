import React from "react";
import NextLink from "next/link";

export interface LinkProps {
  children: React.ReactNode;
  target?: string;
  href: string;
}

const Link = ({ children, href, target }: LinkProps) => {
  if (process?.env?.STORYBOOK || process?.env?.NODE_ENV === "test") {
    return (
      <a href={String(href)} target={target}>
        {children}
      </a>
    );
  }

  return <NextLink href={href}>{children}</NextLink>;
};

export default Link;
