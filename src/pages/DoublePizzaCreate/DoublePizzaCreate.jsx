import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RootState } from '../../redux/store';
import { fetchPizzas } from '../../redux/slices/pizzasSlice';

const DoublePizzaCreate: React.FC = () => {
   const dispatch = useDispatch();

   const { items } = useSelector((state: RootState) => state.pizza);

   React.useEffect(() => {
      dispatch(fetchPizzas());
   }, []);
   console.log(items);

   const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 2,
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
      <div>
         <Slider {...settings}>
            <div>
               <img src='//cdpiz1.pizzasoft.ru/rs/280x280/pizzafab/items/0/konstruktor-piccy-main_image-114-53765.jpg' alt='' />
            </div>
            <div>
               <img src='//cdpiz1.pizzasoft.ru/rs/280x280/pizzafab/items/0/konstruktor-piccy-main_image-114-53765.jpg' alt='' />
            </div>
            <div>
               <img src='//cdpiz1.pizzasoft.ru/rs/280x280/pizzafab/items/0/konstruktor-piccy-main_image-114-53765.jpg' alt='' />
            </div>
            <div>
               <img src='//cdpiz1.pizzasoft.ru/rs/280x280/pizzafab/items/0/konstruktor-piccy-main_image-114-53765.jpg' alt='' />
            </div>
            <div>
               <img src='//cdpiz1.pizzasoft.ru/rs/280x280/pizzafab/items/0/konstruktor-piccy-main_image-114-53765.jpg' alt='' />
            </div>
            <div>
               <img src='//cdpiz1.pizzasoft.ru/rs/280x280/pizzafab/items/0/konstruktor-piccy-main_image-114-53765.jpg' alt='' />
            </div>
         </Slider>
      </div>
   );
};

export default DoublePizzaCreate;
