import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Slider.module.scss';
import Slider from 'react-slick';
import { CustomArrow } from './CustomArrow/CustomArrow';

export const SliderPizza = React.forwardRef(({ side, afterChange, pizzas }, ref) => {
   const settingsSlider = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: false,
      vertical: true,
      verticalSwiping: true,
      prevArrow: <CustomArrow direction='prev' className={styles} />,
      nextArrow: <CustomArrow direction='next' />
   };

   return (
      <Slider afterChange={afterChange} ref={ref} {...settingsSlider}>
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
