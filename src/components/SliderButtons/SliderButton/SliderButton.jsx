import React from 'react';
import styles from '../SliderButtons.module.scss';

export const SliderButton = React.forwardRef(({ goToSlide, id, setActiveSlide, activeSlide, item, index }, ref) => {
   return (
      <button
         onClick={() => goToSlide(ref, id, setActiveSlide)}
         className={`${styles.button_check} ${index === activeSlide ? styles.active : ''}`}
         type='button'
      >
         <img className={styles.button_check__img} src={item.imageUrl} alt='pizza' />
      </button>
   );
});
