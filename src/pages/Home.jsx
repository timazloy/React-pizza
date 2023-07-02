import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlices';

import '../scss/app.scss';
import '../App.css';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

function Home({ searchValue }) {
   const dispatch = useDispatch();
   const categoryId = useSelector((state) => state.filter.categoryId);

   const [items, setItems] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(true);

   const [currentPage, setCurrentPage] = React.useState(1);

   // const [categoryId, setCategoryId] = React.useState(0);
   const [selectedSort, setSelectedSort] = React.useState({
      name: 'популярности (DESC)',
      sort: 'rating',
      direction: 'desc'
   });

   const category = categoryId > 0 ? `category=${categoryId}` : '';

   // const onClickCategory = (id) => {};

   const clickCategory = (id) => {
      // setCategoryId(i);
      console.log(id);
      dispatch(setCategoryId(id));
   };

   console.log(categoryId);

   const sortItems = (obj) => {
      setSelectedSort(obj);
   };

   const clickPagination = (page) => {
      setCurrentPage(page);
   };

   React.useEffect(() => {
      setIsLoading(true);
      fetch(
         `https://639f35a97aaf11ceb8954a67.mockapi.io/Themes?page=${currentPage}&limit=8${category}&sortBy=${selectedSort.sort}&order=${selectedSort.direction}&search=${searchValue}`
      )
         .then((res) => res.json())
         .then((json) => {
            setItems(json);
            setIsLoading(false);
         });
   }, [categoryId, selectedSort, searchValue, currentPage]);

   return (
      <div className='content'>
         <div className='container'>
            <div className='content__top'>
               <Categories categoryId={categoryId} clickCategory={clickCategory} />
               <Sort selectedSort={selectedSort} sortItems={sortItems} />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
               {isLoading
                  ? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
                  : items.map((pizza, i) => <PizzaBlock {...pizza} key={pizza.id} />)}
            </div>
            <Pagination currentPage={currentPage} clickPagination={(page) => clickPagination(page)} />
         </div>
      </div>
   );
}

export default Home;
