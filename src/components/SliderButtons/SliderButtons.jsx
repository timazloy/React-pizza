import React from 'react';
import styles from './SliderButtons.module.scss';

export const SliderButtons = React.forwardRef(({ pizzas, goToSlide, setActiveSlide, activeSlide }, ref) => {
   return (
      <div className=''>
         <div className={styles.pizzas_check}>
            {pizzas.map((item, index) => (
               <button
                  key={item.id}
                  onClick={() => goToSlide(ref, item.id, setActiveSlide)}
                  className={`${styles.button_check} ${index === activeSlide ? styles.active : ''}`}
                  type='button'
               >
                  <img className={styles.button_check__img} src={item.imageUrl} alt='pizza' />
               </button>
            ))}
         </div>
      </div>
   );
});
