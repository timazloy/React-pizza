import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styles from './Loading.module.scss';

export const Loading: React.FC = () => {
   return (
      <div className={styles.loading}>
         <ThreeDots height='80' width='80' radius='9' color='#fe5f1e' ariaLabel='loading' />
      </div>
   );
};
