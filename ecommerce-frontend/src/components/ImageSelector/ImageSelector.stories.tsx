import React from "react";
import ImageSelector, { ImageSelectorProps } from "./ImageSelector";

export default {
  title: "ImageSelector",
  component: ImageSelector,
};

export const Default = (args: ImageSelectorProps) => (
  <ImageSelector {...args} />
);
