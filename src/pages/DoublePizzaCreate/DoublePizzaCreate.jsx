import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import styles from './DoublePizzaCreate.module.scss';
import {
   ButtonAdd,
   ButtonBack,
   ConfigurePizza,
   Loading,
   SliderPizza,
   SliderButtons,
   CustomArrow,
   DoublePizzaName
} from '../../components';
import { addToCart } from '../../redux/slices/cartSlice';

const DoublePizzaCreate = () => {
   const [pizzas, setPizzas] = React.useState([]);
   const [leftImg, setLeftImg] = React.useState(pizzas[0]?.imageLeftPart);
   const [rightImg, setRightImg] = React.useState(pizzas[0]?.imageRightPart);
   const [activeSize, setActiveSize] = React.useState('26');
   const [activeType, setActiveType] = React.useState('тонкое');
   const [activeSlideRight, setActiveSlideRight] = React.useState(0);
   const [activeSlideLeft, setActiveSlideLeft] = React.useState(0);
   const [currentPizzaLeft, setCurrentPizzaLeft] = React.useState('');
   const [currentPizzaRight, setCurrentPizzaRight] = React.useState('');
   const [totalPrice, setTotalPrice] = React.useState(() => {
      const leftPizzaPrice = pizzas[0]?.sizes[activeSize] / 2 + pizzas[0]?.types[activeType] / 2 || 0;
      const rightPizzaPrice = pizzas[0]?.sizes[activeSize] / 2 + pizzas[0]?.types[activeType] / 2 || 0;
      return leftPizzaPrice + rightPizzaPrice;
   });

   const sliderRightRef = useRef(null);
   const sliderLeftRef = useRef(null);

   const dispatch = useDispatch();

   React.useEffect(() => {
      async function fetchData() {
         try {
            const pizzas = await axios.get('https://639f35a97aaf11ceb8954a67.mockapi.io/Themes');
            setPizzas(pizzas.data);
            setCurrentPizzaLeft(pizzas.data[0].title);
            setCurrentPizzaRight(pizzas.data[0].title);
            setTotalPrice(Math.ceil(pizzas.data[0].price + pizzas.data[0].price) / 2);
            setLeftImg(pizzas.data[0]?.imageLeftPart);
            setRightImg(pizzas.data[0]?.imageRightPart);
         } catch (error) {
            console.log(error);
         }
      }
      fetchData();
   }, []);

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

   const changeSize = (size) => {
      setActiveSize(size);
   };

   const changeType = (type) => {
      setActiveType(type);
   };

   React.useEffect(() => {
      const leftPizzaPrice = pizzas[activeSlideLeft]?.sizes[activeSize] / 2 + pizzas[activeSlideLeft]?.types[activeType] / 2 || 0;
      const rightPizzaPrice =
         pizzas[activeSlideRight]?.sizes[activeSize] / 2 + pizzas[activeSlideRight]?.types[activeType] / 2 || 0;
      setTotalPrice(Math.ceil(leftPizzaPrice + rightPizzaPrice));
      setLeftImg(pizzas[activeSlideLeft]?.imageLeftPart);
      setRightImg(pizzas[activeSlideRight]?.imageRightPart);
   }, [activeSize, activeSlideLeft, activeSlideRight, activeType]);

   const addToCat = () => {
      const item = {
         id: currentPizzaLeft === currentPizzaRight ? pizzas[activeSlideLeft]?.id : currentPizzaLeft + currentPizzaRight,
         title: currentPizzaLeft === currentPizzaRight ? currentPizzaRight : `${currentPizzaLeft} + ${currentPizzaRight}`,
         img: [leftImg, rightImg],
         imgLeft: leftImg,
         imgRight: rightImg,
         price: totalPrice,
         type: activeType,
         size: activeSize,
         count: 1
      };

      dispatch(addToCart(item));
   };

   if (!pizzas || pizzas.length === 0) {
      return <Loading />;
   }

   return (
      <>
         <ButtonBack />
         <div className={styles.wrapper}>
            <DoublePizzaName currentPizzaLeft={currentPizzaLeft} currentPizzaRight={currentPizzaRight} />
            <div className={styles.total_price}>Итого: {totalPrice} ₽</div>
            <div className={styles.wrapper__column}>
               <SliderButtons
                  pizzas={pizzas}
                  goToSlide={goToSlide}
                  activeSlide={activeSlideLeft}
                  ref={sliderLeftRef}
                  setActiveSlide={setActiveSlideLeft}
               />
               <ConfigurePizza
                  changeSize={changeSize}
                  changeType={changeType}
                  keysTypes={['тонкое', 'традиционное']}
                  keysSizes={['26', '30', '40']}
                  activeType={activeType}
                  activeSize={activeSize}
               />
            </div>

            <SliderPizza side='left' afterChange={handleSlideChangeLeft} ref={sliderLeftRef} pizzas={pizzas} />
            <SliderPizza side='right' afterChange={handleSlideChangeRight} ref={sliderRightRef} pizzas={pizzas} />
            <div className={styles.pizzas_check}>
               <div className={styles.wrapper__column}>
                  <SliderButtons
                     pizzas={pizzas}
                     goToSlide={goToSlide}
                     activeSlide={activeSlideRight}
                     ref={sliderRightRef}
                     setActiveSlide={setActiveSlideRight}
                  />
                  <ButtonAdd addToCat={addToCat} />
               </div>
            </div>
         </div>
      </>
   );
};

export default DoublePizzaCreate;
