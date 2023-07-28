import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import styles from './DoublePizzaCreate.module.scss';

const DoublePizzaCreate: React.FC = () => {
   const [pizzas, setPizzas] = React.useState([]);

   React.useEffect(() => {
      async function fetchData() {
         const pizzas = await axios.get('https://639f35a97aaf11ceb8954a67.mockapi.io/Themes');
         setPizzas(pizzas.data);
      }
      fetchData();
   }, []);

   const settings = {
      infinite: true,
      slidesToShow: 1,
      // variableWidth: true,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      swipeToSlide: true,
      beforeChange: function (currentSlide, nextSlide) {
         console.log('before change', currentSlide, nextSlide);
      },
      afterChange: function (currentSlide) {
         console.log('after change', currentSlide);
      }
   };

   return (
      <div className={styles.test}>
         <Slider {...settings}>
            {pizzas.map((item) => (
               <div className={styles.pizza_wrapper} key={item.id}>
                  <img className={styles.pizza_wrapper__img} src={item.imageUrl} alt='pizza' />
                  <h4>{item.title}</h4>
                  {/*<p>{item.description}</p>*/}
               </div>
            ))}
         </Slider>
         <Slider {...settings}>
            {pizzas.map((item) => (
               <div className={styles.pizza_wrapper} key={item.id}>
                  <img className={styles.pizza_wrapper__img} src={item.imageUrl} alt='pizza' />
                  <h4>{item.title}</h4>
                  {/*<p>{item.description}</p>*/}
               </div>
            ))}
         </Slider>
      </div>
   );
};

export default DoublePizzaCreate;
