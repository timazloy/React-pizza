import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setSelectedSort, setCurrentPage, setFilters } from '../redux/slices/filterSlices';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import '../scss/app.scss';
import '../App.css';

import Categories from '../components/Categories';
import Sort, { sortSettingItems } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import Error from '../components/Error/Error';

function Home({ searchValue }) {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const isSearch = React.useRef(false);
   const isMount = React.useRef(false);

   const { categoryId, sort, currentPagePaginate } = useSelector((state) => state.filter);
   const selectedSort = sort;
   const currentPage = currentPagePaginate;

   const [items, setItems] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(true);
   const [pizzasError, setPizzasError] = React.useState(false);

   const category = categoryId > 0 ? `&category=${categoryId}` : '';

   const clickCategory = (id) => {
      dispatch(setCategoryId(id));
   };

   const sortItems = (obj) => {
      dispatch(setSelectedSort(obj));
   };

   const clickPagination = (page) => {
      dispatch(setCurrentPage(page));
   };

   const fetchPizzas = async () => {
      try {
         setIsLoading(true);
         const res = await axios.get(
            `https://639f35a97aaf11ceb8954a67.mockapi.io/Themes?page=${currentPage}&limit=8${category}&sortBy=${selectedSort.sort}&order=${selectedSort.direction}&search=${searchValue}`
         );
         setItems(res.data);
      } catch (error) {
         console.log(error);
         setPizzasError(true);
      } finally {
         setIsLoading(false);
      }
   };

   // Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1));

         const sort = sortSettingItems.find((obj) => obj.sort === params.selectedSort.sort);
         dispatch(setFilters({ ...params, sort }));

         isSearch.current = true;
      }
   }, []);

   // Если был первый рендер, то запрашиваем пиццы
   React.useEffect(() => {
      window.scrollTo(0, 0);

      if (!isSearch.current) {
         fetchPizzas();
      }

      isSearch.current = false;
   }, [categoryId, selectedSort, searchValue, currentPage]);

   // Ели изменили параметры и был первый рендер
   React.useEffect(() => {
      if (isMount.current) {
         const queryString = qs.stringify({
            sortProperty: currentPage,
            categoryId,
            selectedSort
         });

         navigate(`?${queryString}`);
      }

      isMount.current = true;
   }, [categoryId, selectedSort, currentPage]);

   return (
      <div className='content'>
         <div className='container'>
            <div className='content__top'>
               <Categories categoryId={categoryId} clickCategory={clickCategory} />
               <Sort selectedSort={selectedSort} sortItems={sortItems} />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
               {pizzasError ? (
                  <Error />
               ) : isLoading ? (
                  [...new Array(8)].map((_, i) => <Skeleton key={i} />)
               ) : (
                  items.map((pizza, i) => <PizzaBlock {...pizza} key={pizza.id} />)
               )}
            </div>
            {!pizzasError && <Pagination currentPage={currentPage} clickPagination={(page) => clickPagination(page)} />}
         </div>
      </div>
   );
}

export default Home;
