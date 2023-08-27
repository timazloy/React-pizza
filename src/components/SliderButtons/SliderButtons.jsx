import React from 'react';
import styles from './SliderButtons.module.scss';
import { SliderButton } from '../index';

export const SliderButtons = React.forwardRef(({ pizzas, goToSlide, setActiveSlide, activeSlide }, ref) => {
   return (
      <div className=''>
         <div className={styles.pizzas_check}>
            {pizzas.map((item, index) => (
               <SliderButton
                  key={item.id}
                  goToSlide={goToSlide}
                  ref={ref}
                  id={item.id}
                  setActiveSlide={setActiveSlide}
                  activeSlide={activeSlide}
                  item={item}
                  index={index}
               />
            ))}
         </div>
      </div>
   );
});
