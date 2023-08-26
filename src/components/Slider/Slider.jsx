import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Slider.module.scss';
import Slider from 'react-slick';

export const SliderPizza = React.forwardRef(({ side, afterChange, settings, pizzas }, ref) => {
   return (
      <Slider afterChange={afterChange} ref={ref} {...settings}>
         {pizzas.map((item) => (
            <Link to={`/pizza/${item.id}`} key={item.id}>
               <div className={styles.pizza_wrapper} key={item.id}>
                  <img
                     className={
                        side === 'left'
                           ? `${styles.pizza_wrapper__img} ${styles.pizza_wrapper__img_left}`
                           : styles.pizza_wrapper__img
                     }
                     src={side === 'left' ? item.imageLeftPart : item.imageRightPart}
                     alt='pizza'
                  />
               </div>
            </Link>
         ))}
      </Slider>
   );
});
