import React from 'react';
import styles from './Pagination.module.scss';

type PaginationProps = {
   currentPage: number;
   clickPagination: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, clickPagination }) => {
   const pages = [1, 2];

   return (
      <div className={styles.pagination}>
         {pages.map((page, i) => (
            <button
               type='button'
               key={i}
               className={currentPage === page ? `${styles.pagination__item} ${styles.active}` : styles.pagination__item}
               onClick={() => clickPagination(page)}
            >
               {page}
            </button>
         ))}
      </div>
   );
};

export default Pagination;
