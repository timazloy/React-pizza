import React from 'react';
import styles from '../../pages/DoublePizzaCreate/DoublePizzaCreate.module.scss';

interface DoublePizzaNameProps {
   currentPizzaLeft: string;
   currentPizzaRight: string;
}

export const DoublePizzaName: React.FC<DoublePizzaNameProps> = ({ currentPizzaLeft, currentPizzaRight }) => {
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
