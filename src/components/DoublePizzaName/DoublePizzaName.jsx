import React from 'react';
import styles from '../../pages/DoublePizzaCreate/DoublePizzaCreate.module.scss';

export const DoublePizzaName = ({ currentPizzaLeft, currentPizzaRight }) => {
   return (
      <>
         {currentPizzaLeft === currentPizzaRight ? (
            <div className={styles.pizzas_plus}>{currentPizzaLeft}</div>
         ) : (
            <div className={styles.pizzas_plus}>
               {currentPizzaLeft} + {currentPizzaRight}
            </div>
         )}
      </>
   );
};
