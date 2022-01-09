import React from "react";
import NextImage, { ImageProps } from "next/image";

const Image = (props: ImageProps) => {
  if (process?.env?.STORYBOOK) {
    return <NextImage {...props} unoptimized />;
  }

  return <NextImage {...props} />;
};

export default Image;
