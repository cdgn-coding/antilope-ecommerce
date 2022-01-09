import React from "react";
import styles from "./Pagination.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export interface PaginationProps {
  page?: number;
  totalPages?: number;
  onNext?: () => void;
  onPrevious?: () => void;
}

const Pagination = ({
  page,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) => {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  const text = `Página ${page} de ${totalPages}`;
  return (
    <div className={styles.container}>
      {!isFirstPage && (
        <span onClick={onPrevious}>
          <MdKeyboardArrowLeft className={styles.arrowIcon} />
        </span>
      )}
      <span className={styles.text}>{text}</span>
      {!isLastPage && (
        <span onClick={onNext}>
          <MdKeyboardArrowRight className={styles.arrowIcon} />
        </span>
      )}
    </div>
  );
};

export default Pagination;
