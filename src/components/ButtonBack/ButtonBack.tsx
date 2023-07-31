import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ButtonBack.module.scss';
import buttonImg from '../../assets/img/back.svg';

export const ButtonBack: React.FC = () => {
   return (
      <Link to='/' className={styles.button_back}>
         <img src={buttonImg} alt='back' />
      </Link>
   );
};
