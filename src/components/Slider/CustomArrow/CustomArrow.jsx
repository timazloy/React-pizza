import React from 'react';
import styles from '../../../pages/DoublePizzaCreate/DoublePizzaCreate.module.scss';
import arrowImg from '../../../assets/img/back.svg';

export const CustomArrow = ({ direction, ...props }) => {
   const { onClick } = props;
   return (
      <button className={direction === 'prev' ? styles.arrow_prev : styles.arrow_next} onClick={onClick} type='button'>
         <img src={arrowImg} alt='arrow' />
      </button>
   );
};
