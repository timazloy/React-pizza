import React from 'react';
import styles from './ButtonBack.module.scss';
import buttonImg from '../../assets/img/back.svg';
import { useNavigate } from 'react-router-dom';

export const ButtonBack: React.FC = () => {
   const navigate = useNavigate();

   const handleGoBack = () => {
      navigate(-1); // Переход на предыдущую страницу в истории
   };

   return (
      <button className={styles.button_back} onClick={handleGoBack}>
         <img src={buttonImg} alt='back' />
      </button>
   );
};
