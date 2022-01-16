import React from "react";
import ImageSelector, { ImageSelectorProps } from "./ImageSelector";
import headsetRose from "./fixtures/headsetRose.jpg";
import headsetYellow from "./fixtures/headsetYellow.jpg";

export default {
  title: "ImageSelector",
  component: ImageSelector,
  argTypes: {
    images: {
      control: { type: "array" },
      defaultValue: [headsetRose, headsetYellow],
    },
  },
};

export const Default = (args: ImageSelectorProps) => (
  <ImageSelector {...args} />
);
