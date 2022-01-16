import React from "react";
import NextLink from "next/link";

export interface LinkProps {
  children: React.ReactNode;
  href: string;
}

const Link = ({ children, href }: LinkProps) => {
  if (process?.env?.STORYBOOK || process?.env?.NODE_ENV === "test") {
    return <a href={String(href)}>{children}</a>;
  }

  return <NextLink href={href}>{children}</NextLink>;
};

export default Link;
