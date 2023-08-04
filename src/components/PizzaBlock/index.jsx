import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import ratingIMG from '../../assets/img/rating2.svg';
import { CartItem } from '../../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

import { ConfigurePizza, ButtonAdd } from '../index';
// import { log } from 'util';

type PizzaBlockProps = {
   id: string,
   imageUrl: string,
   title: string,
   description: string,
   price: string,
   rating: string,
   types: number[],
   sizes: number[]
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({ title, imageUrl, types, sizes, price, id, rating }) => {
   const dispatch = useDispatch();

   const [activeSize, setActiveSize] = React.useState('26');
   const [activeType, setActiveType] = React.useState('тонкое');

   const keysTypes = Object.keys(types);
   const keysSizes = Object.keys(sizes);
   const totalCost = sizes[activeSize] + types[activeType];

   const addToCat = () => {
      const item: CartItem = {
         id,
         title,
         img: imageUrl,
         price: totalCost,
         type: activeType,
         size: activeSize,
         count: 1
      };

      dispatch(addToCart(item));
   };

   const changeSize = (size: any, index: any) => {
      setActiveSize(size);
   };

   const changeType = (type: any, index: any) => {
      setActiveType(type);
   };

   return (
      <div className='pizza-block'>
         <Link to={`/pizza/${id}`}>
            <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
            <h4 className='pizza-block__title'>{title}</h4>
            <div className='pizza-block__rating'>
               <img src={ratingIMG} alt='rating' />
               <span className='pizza-block__rating-text'>{rating}</span>
            </div>
         </Link>
         <ConfigurePizza
            changeSize={changeSize}
            changeType={changeType}
            keysTypes={keysTypes}
            keysSizes={keysSizes}
            activeType={activeType}
            activeSize={activeSize}
         />
         <div className='pizza-block__bottom'>
            <div className='pizza-block__price'>Цена {totalCost} ₽</div>
            <ButtonAdd addToCat={addToCat} />
         </div>
      </div>
   );
};
