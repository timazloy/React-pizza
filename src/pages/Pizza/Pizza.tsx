import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Pizza.module.scss';
import rating from '../../assets/img/rating2.svg';
import { CSSProperties } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Pizza: React.FC = () => {
   const [pizza, setPizza] = React.useState<{
      imageUrl: string;
      title: string;
      description: string;
      price: string;
      rating: string;
   }>();
   const { id } = useParams();

   React.useEffect(() => {
      async function fetchData() {
         try {
            const { data } = await axios.get(`https://639f35a97aaf11ceb8954a67.mockapi.io/Themes/${id}`);
            setPizza(data);
         } catch (error) {
            console.log(error);
         }
      }

      fetchData();
   }, []);

   console.log(pizza);

   const override: CSSProperties = {
      display: 'block',
      margin: '0 auto',
      borderColor: '#fe5f1e'
   };

   if (!pizza) {
      return (
         <div className={styles.loading}>
            {/*@ts-ignore*/}
            <ThreeDots height='80' width='80' radius='9' color='#fe5f1e' ariaLabel='loading' wrapperStyle wrapperClass />
         </div>
      );
   }

   return (
      <div className={styles.root}>
         <div className={styles.root__images}>
            <img src={pizza.imageUrl} alt='pizza' />
            <div className={styles.root__rating}>
               <img src={rating} alt='rating' />
               <span className={styles.root__ratingNum}>{pizza.rating}</span>
            </div>
         </div>
         <div className={styles.root__wrapper}>
            <h1>{pizza.title}</h1>
            <p className={styles.root__description}>{pizza.description}</p>
            <ul className={styles.root__info}>
               <li>
                  Мы особенно гордимся тем, что в нашей пиццерии используются только свежие и качественные ингредиенты. Наша
                  команда тщательно подбирает овощи и фрукты, чтобы каждый кусочек пиццы радовал вас свежим и сочным вкусом.
               </li>
               <li>
                  Нам очень важно качество мяса, которое мы используем в наших рецептах. Мы работаем только с проверенными
                  поставщиками, чтобы гарантировать идеально приготовленные мясные начинки с насыщенным вкусом.
               </li>
            </ul>
            <h1>{pizza.price}</h1>
            {/*<div className='pizza-block__selector'>*/}
            {/*   <ul>*/}
            {/*      {keysTypes.map((type, i) => (*/}
            {/*         <li onClick={() => setActiveType(i)} className={activeType === i ? 'active' : ''} key={i}>*/}
            {/*            {keysTypes[i]}*/}
            {/*         </li>*/}
            {/*      ))}*/}
            {/*   </ul>*/}
            {/*   <ul>*/}
            {/*      {keysSizes.map((size, i) => (*/}
            {/*         <li onClick={() => setActiveSize(i)} className={activeSize === i ? 'active' : ''} key={i}>*/}
            {/*            {keysSizes[i]} см.*/}
            {/*         </li>*/}
            {/*      ))}*/}
            {/*   </ul>*/}
            {/*</div>*/}
         </div>
      </div>
   );
};

export default Pizza;
