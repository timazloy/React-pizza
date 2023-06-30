import React from 'react';
import '../scss/app.scss';
import '../App.css';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';

function Home() {
   const [items, setItems] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(true);

   const [categoryId, setCategoryId] = React.useState(0);
   const category = categoryId > 0 ? `category=${categoryId}` : '';

   const clickCategory = (i) => {
      setCategoryId(i);
   };

   React.useEffect(() => {
      fetch(`https://639f35a97aaf11ceb8954a67.mockapi.io/Themes?${category}&sortBy=price&order=asc`)
         .then((res) => res.json())
         .then((json) => {
            setItems(json);
            setIsLoading(false);
         });
   }, [categoryId]);

   return (
      <div className='content'>
         <div className='container'>
            <div className='content__top'>
               <Categories categoryId={categoryId} clickCategory={clickCategory} />
               <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
               {isLoading
                  ? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
                  : items.map((pizza, i) => <PizzaBlock {...pizza} key={pizza.id} />)}
            </div>
         </div>
      </div>
   );
}

export default Home;
