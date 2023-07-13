import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Pizza.module.scss';
import rating from '../../assets/img/rating2.svg';

function Pizza() {
   const [pizza, setPizza] = React.useState({});
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
      return 'Loading';
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
            <p>{pizza.description}</p>
            <h1>{pizza.price}</h1>
         </div>
      </div>
   );
}

export default Pizza;
