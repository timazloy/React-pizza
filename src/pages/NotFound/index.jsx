import React from 'react';
import '../../scss/app.scss';
import '../../App.css';
import NotFoundGif from '../../assets/img/travolta.gif';
import styles from './NotFound.module.scss';

function Index() {
   return (
      <div className={styles.notFound}>
         <h1 className={styles.notFound__title}>Страница не найдена</h1>
         <img className={styles.notFound__gif} src={NotFoundGif} alt='404-image' />
      </div>
   );
}

export default Index;
