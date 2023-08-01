import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import styles from './DoublePizzaCreate.module.scss';
import arrowImg from '../../assets/img/back.svg';
import { ButtonBack, Loading } from '../../components';

const DoublePizzaCreate: React.FC = () => {
   const [pizzas, setPizzas] = React.useState([]);

   React.useEffect(() => {
      async function fetchData() {
         const pizzas = await axios.get('https://639f35a97aaf11ceb8954a67.mockapi.io/Themes');
         setPizzas(pizzas.data);
      }
      fetchData();
   }, []);

   const CustomPrevArrow = (props) => {
      const { onClick } = props;
      return (
         <button className={styles.arrow_prev} onClick={onClick} type='button'>
            <img src={arrowImg} alt='arrow' />
         </button>
      );
   };

   const CustomNextArrow = (props) => {
      const { onClick } = props;
      return (
         <button className={styles.arrow_next} onClick={onClick} type='button'>
            <img src={arrowImg} alt='arrow' />
         </button>
      );
   };

   const settings = {
      infinite: true,
      slidesToShow: 1.6,
      slidesToScroll: 1,
      swipe: false,
      vertical: true,
      verticalSwiping: true,
      // swipeToSlide: true,
      beforeChange: function (currentSlide, nextSlide) {
         // console.log('before change', currentSlide, nextSlide);
         console.log(pizzas[currentSlide]);
      },
      afterChange: function (currentSlide) {
         // console.log('after change', currentSlide);
         // console.log(pizzas[currentSlide]);
      },
      prevArrow: <CustomPrevArrow className={styles} />,
      nextArrow: <CustomNextArrow />
   };

   return (
      <>
         <ButtonBack />
         <div className={styles.test}>
            <Slider {...settings}>
               {pizzas.map((item) => (
                  <Link to={`/pizza/${item.id}`}>
                     <div className={styles.pizza_wrapper} key={item.id}>
                        <img
                           className={`${styles.pizza_wrapper__img} ${styles.pizza_wrapper__img_left}`}
                           src={item.imageLeftPart}
                           alt='pizza'
                        />
                        <h4 className={`${styles.pizza_name} ${styles.pizza_name_left}`}>{item.title}</h4>
                     </div>
                  </Link>
               ))}
            </Slider>
            <Slider {...settings}>
               {pizzas.map((item) => (
                  <Link to={`/pizza/${item.id}`}>
                     <div className={styles.pizza_wrapper} key={item.id}>
                        <img className={styles.pizza_wrapper__img} src={item.imageRightPart} alt='pizza' />
                        <h4 className={`${styles.pizza_name} ${styles.pizza_name_right}`}>{item.title}</h4>
                     </div>
                  </Link>
               ))}
            </Slider>
         </div>
      </>
   );
};

export default DoublePizzaCreate;
