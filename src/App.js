import './App.css';
import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import Skeleton from './components/PizzaBlock/Skeleton';

function App() {
   const [items, setItems] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(true);

   React.useEffect(() => {
      fetch('https://639f35a97aaf11ceb8954a67.mockapi.io/Themes')
         .then((res) => res.json())
         .then((json) => {
            setItems(json);
            setIsLoading(false);
         });
   }, []);

   return (
      <div className='wrapper'>
         <Header />
         <div className='content'>
            <div className='container'>
               <div className='content__top'>
                  <Categories />
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
      </div>
   );
}

export default App;
