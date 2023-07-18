import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import ratingIMG from '../../assets/img/rating2.svg';

type PizzaBlockProps = {
   id: string;
   imageUrl: string;
   title: string;
   description: string;
   price: string;
   rating: string;
   types: number[];
   sizes: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ title, imageUrl, types, sizes, price, id, rating }) => {
   const [activeSize, setActiveSize] = React.useState(0);
   const [activeType, setActiveType] = React.useState(0);
   const typeNames = ['тонкое', 'традиционное'];

   const type = typeNames[activeType];
   const size = sizes[activeSize];

   const dispatch = useDispatch();

   const addToCat = () => {
      dispatch(
         addToCart({
            id,
            title,
            img: imageUrl,
            price,
            type,
            size,
            count: 1
         })
      );
   };

   return (
      <div className='pizza-block'>
         <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
         <h4 className='pizza-block__title'>{title}</h4>
         <div className='pizza-block__rating'>
            <img src={ratingIMG} alt='rating' />
            <span className='pizza-block__rating-text'>{rating}</span>
         </div>

         <div className='pizza-block__selector'>
            <ul>
               {types.map((type, i) => (
                  <li onClick={() => setActiveType(i)} className={activeType === i ? 'active' : ''} key={i}>
                     {typeNames[i]}
                  </li>
               ))}
            </ul>
            <ul>
               {sizes.map((size, i) => (
                  <li onClick={() => setActiveSize(i)} className={activeSize === i ? 'active' : ''} key={i}>
                     {size} см.
                  </li>
               ))}
            </ul>
         </div>
         <div className='pizza-block__bottom'>
            <div className='pizza-block__price'>от {price} ₽</div>
            <button onClick={addToCat} type='button' className='button button--outline button--add'>
               <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                     d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                     fill='white'
                  />
               </svg>
               <span>Добавить</span>
            </button>
         </div>
      </div>
   );
};

export default PizzaBlock;