import React from 'react';
import styles from './CartEmpty.module.scss';
import NotFoundGif from '../../assets/img/travolta.gif';

export const CartEmpty: React.FC = () => {
   return (
      <div className={styles.root}>
         <div className={styles.root__wrapper}>
            <h1 className={styles.root__title}>А питсы где?</h1>
            <img className={styles.root__gif} src={NotFoundGif} alt='404-image' />
            <h2 className={styles.root__subtitle}>Добавьте хотя бы одну...</h2>
         </div>
      </div>
   );
};
