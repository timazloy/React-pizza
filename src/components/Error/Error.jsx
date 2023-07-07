import React from 'react';
import ErrorCasino from '../../assets/img/error-casino.gif';
import styles from './Error.module.scss';

function Error() {
   return (
      <div className={styles.root}>
         <h1 className={styles.root__title}>Извините, кажется что-то сломалось...</h1>
         <img src={ErrorCasino} className={styles.root__img} alt='error' />
         <h2 className={styles.root__subtitle}>...починим в ближайшее время</h2>
      </div>
   );
}

export default Error;
