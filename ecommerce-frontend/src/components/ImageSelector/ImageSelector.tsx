import React, { useState } from "react";
import styles from "./ImageSelector.module.css";
import Image from "@components/Image";

export interface ImageSelectorProps {
  images: string[];
}

const ImageSelector = ({ images }: ImageSelectorProps) => {
  const initialImage = images[0];
  const [selectedImage, setSelectedImage] = useState(initialImage);

  const renderSelectableImage = (image: string) => {
    return (
      <div className={styles.selectableImage}>
        <Image src={image} layout="fill" />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectedImageContainer}>
        <div className={styles.selectedImage}>
          <Image src={selectedImage} layout="fill" />
        </div>
      </div>
      <div className={styles.imagePool}>
        {images.map(renderSelectableImage)}
      </div>
    </div>
  );
};

export default ImageSelector;
