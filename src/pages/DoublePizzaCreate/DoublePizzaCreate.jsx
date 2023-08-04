import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import styles from './DoublePizzaCreate.module.scss';
import arrowImg from '../../assets/img/back.svg';
import { ButtonBack, ConfigurePizza, Loading } from '../../components';

const DoublePizzaCreate: React.FC = () => {
   const [pizzas, setPizzas] = React.useState([]);

   React.useEffect(() => {
      async function fetchData() {
         try {
            const pizzas = await axios.get('https://639f35a97aaf11ceb8954a67.mockapi.io/Themes');
            setPizzas(pizzas.data);
            setCurrentPizzaLeft(pizzas.data[0].title);
            setCurrentPizzaRight(pizzas.data[0].title);
            setTotalPrice(Math.ceil(pizzas.data[0].price + pizzas.data[0].price) / 2);
         } catch (error) {
            console.log(error);
         }
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
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: false,
      vertical: true,
      verticalSwiping: true,
      prevArrow: <CustomPrevArrow className={styles} />,
      nextArrow: <CustomNextArrow />
   };

   const [activeSize, setActiveSize] = React.useState('26');
   const [activeType, setActiveType] = React.useState('тонкое');

   const sliderRightRef = useRef(null);
   const sliderLeftRef = useRef(null);
   const [activeSlideRight, setActiveSlideRight] = React.useState(0);
   const [activeSlideLeft, setActiveSlideLeft] = React.useState(0);
   const [currentPizzaLeft, setCurrentPizzaLeft] = React.useState('');
   const [currentPizzaRight, setCurrentPizzaRight] = React.useState('');
   const [totalPrice, setTotalPrice] = React.useState(() => {
      const leftPizzaPrice = pizzas[0]?.sizes[activeSize] / 2 + pizzas[0]?.types[activeType] / 2 || 0;
      const rightPizzaPrice = pizzas[0]?.sizes[activeSize] / 2 + pizzas[0]?.types[activeType] / 2 || 0;
      return leftPizzaPrice + rightPizzaPrice;
   });

   const goToSlide = (ref, slideIndex, setActive) => {
      ref.current.slickGoTo(slideIndex);
      setActive(slideIndex);
   };

   const handleSlideChangeLeft = (currentSlide) => {
      setActiveSlideLeft(currentSlide);
      setCurrentPizzaLeft(pizzas[currentSlide].title);
   };

   const handleSlideChangeRight = (currentSlide) => {
      setActiveSlideRight(currentSlide);
      setCurrentPizzaRight(pizzas[currentSlide].title);
   };

   const changeSize = (size, index) => {
      setActiveSize(size);
   };

   const changeType = (type, index) => {
      setActiveType(type);
   };

   React.useEffect(() => {
      const leftPizzaPrice = pizzas[activeSlideLeft]?.sizes[activeSize] / 2 + pizzas[activeSlideLeft]?.types[activeType] / 2 || 0;
      const rightPizzaPrice =
         pizzas[activeSlideRight]?.sizes[activeSize] / 2 + pizzas[activeSlideRight]?.types[activeType] / 2 || 0;
      setTotalPrice(Math.ceil(leftPizzaPrice + rightPizzaPrice));
   }, [activeSize, activeSlideLeft, activeSlideRight, activeType]);

   if (!pizzas || pizzas.length === 0) {
      return <Loading />;
   }

   return (
      <>
         <ButtonBack />
         <div className={styles.wrapper}>
            {currentPizzaLeft === currentPizzaRight ? (
               <div className={styles.pizzas_plus}>{currentPizzaLeft}</div>
            ) : (
               <div className={styles.pizzas_plus}>
                  {currentPizzaLeft} + {currentPizzaRight}
               </div>
            )}
            <div className={styles.total_price}>Итого: {totalPrice} ₽</div>

            <div className={styles.wrapper__column}>
               <div className={styles.pizzas_check}>
                  {pizzas.map((item, index) => (
                     <button
                        key={item.id}
                        onClick={() => goToSlide(sliderLeftRef, item.id, setActiveSlideLeft)}
                        className={`${styles.button_check} ${index === activeSlideLeft ? styles.active : ''}`}
                        type='button'
                     >
                        <img className={styles.button_check__img} src={item.imageUrl} alt='pizza' />
                     </button>
                  ))}
               </div>
               <ConfigurePizza
                  changeSize={changeSize}
                  changeType={changeType}
                  keysTypes={['тонкое', 'традиционное']}
                  keysSizes={['26', '30', '40']}
                  activeType={activeType}
                  activeSize={activeSize}
               />
            </div>

            <Slider afterChange={handleSlideChangeLeft} ref={sliderLeftRef} {...settings}>
               {pizzas.map((item) => (
                  <Link to={`/pizza/${item.id}`} key={item.id}>
                     <div className={styles.pizza_wrapper}>
                        <img
                           className={`${styles.pizza_wrapper__img} ${styles.pizza_wrapper__img_left}`}
                           src={item.imageLeftPart}
                           alt='pizza'
                        />
                        {/*<h4 className={`${styles.pizza_name} ${styles.pizza_name_left}`}>{item.title}</h4>*/}
                     </div>
                  </Link>
               ))}
            </Slider>
            <Slider afterChange={handleSlideChangeRight} ref={sliderRightRef} {...settings}>
               {pizzas.map((item) => (
                  <Link to={`/pizza/${item.id}`} key={item.id}>
                     <div className={styles.pizza_wrapper} key={item.id}>
                        <img className={styles.pizza_wrapper__img} src={item.imageRightPart} alt='pizza' />
                        {/*<h4 className={`${styles.pizza_name} ${styles.pizza_name_right}`}>{item.title}</h4>*/}
                     </div>
                  </Link>
               ))}
            </Slider>
            <div className={styles.pizzas_check}>
               {pizzas.map((item, index) => (
                  <button
                     key={item.id}
                     onClick={() => goToSlide(sliderRightRef, item.id, setActiveSlideRight)}
                     className={`${styles.button_check} ${index === activeSlideRight ? styles.active : ''}`}
                     type='button'
                  >
                     <img className={styles.button_check__img} src={item.imageUrl} alt='pizza' />
                  </button>
               ))}
            </div>
         </div>
      </>
   );
};

export default DoublePizzaCreate;
