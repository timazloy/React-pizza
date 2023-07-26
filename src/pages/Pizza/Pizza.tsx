import React from 'react';
import { Loading } from '../../components/Loading/Loading';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Pizza.module.scss';
import rating from '../../assets/img/rating2.svg';

const Pizza: React.FC = () => {
   const [pizza, setPizza] = React.useState<{
      imageUrl: string;
      title: string;
      description: string;
      price: string;
      rating: string;
      types: any;
      sizes: any;
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

   if (!pizza) {
      return <Loading />;
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
            <div>
               <div>
                  <p>Тип пиццы:</p>
                  {Object.keys(pizza.types).map((type, i) => (
                     <button key={i}>{type}</button>
                  ))}
               </div>
               <div>
                  <p>Размер:</p>
                  {Object.keys(pizza.sizes).map((type, i) => (
                     <button key={i}>{type}</button>
                  ))}
               </div>
               <span>{pizza.price}</span>
            </div>
         </div>
      </div>
   );
};

export default Pizza;
