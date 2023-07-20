import React from 'react';
import { useSelector } from 'react-redux';
import { setCategoryId, setSelectedSort, setCurrentPage, setFilters, FilterSliceState } from '../redux/slices/filterSlices';
import { fetchPizzas, SearchPizzaParams } from '../redux/slices/pizzasSlice';
// import { useAppDispatch } from '../redux/store';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import '../scss/app.scss';
import '../App.css';

import Categories from '../components/Categories';
import Sort, { sortSettingItems } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import Error from '../components/Error/Error';

const Home: React.FC = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const isSearch = React.useRef(false);
   const isMount = React.useRef(false);

   const { categoryId, sort, currentPagePaginate, searchValue } = useSelector((state) => state.filter);
   const { items, status } = useSelector((state) => state.pizza);
   const selectedSort = sort;
   const activeSort = sort.sort;
   const selectedDirection = sort.direction;
   const currentPage = currentPagePaginate;

   const category = categoryId > 0 ? `&category=${categoryId}` : '';

   const clickCategory = (id: number) => {
      dispatch(setCategoryId(id));
   };

   const sortItems = (obj: any) => {
      dispatch(setSelectedSort(obj));
   };

   const clickPagination = (page: number) => {
      dispatch(setCurrentPage(page));
   };

   const getPizzas = async () => {
      //@ts-ignore
      dispatch(fetchPizzas({ currentPage, category, activeSort, selectedDirection, searchValue }));
      window.scrollTo(0, 0);
   };

   // Парсим параметры при первом рендере
   // React.useEffect(() => {
   //    if (window.location.search) {
   //       const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
   //       const sort = sortSettingItems.find((obj) => obj.sort === params.selectedSort.sort);
   //
   //       dispatch(
   //          setFilters({
   //             searchValue: params.searchValue,
   //             categoryId: Number(params.category),
   //             currentPage: Number(params.currentPage),
   //             sort: sort || sortSettingItems[0]
   //          })
   //       );
   //
   //       isSearch.current = true;
   //    }
   // }, []);

   // Если был первый рендер, то запрашиваем пиццы
   React.useEffect(() => {
      window.scrollTo(0, 0);

      if (!isSearch.current) {
         getPizzas();
      }

      isSearch.current = false;
   }, [categoryId, selectedSort, searchValue, currentPage]);

   // // Ели изменили параметры и был первый рендер
   // React.useEffect(() => {
   //    if (isMount.current) {
   //       const queryString = qs.stringify({
   //          sortProperty: currentPage,
   //          categoryId,
   //          selectedSort
   //       });
   //
   //       navigate(`?${queryString}`);
   //    }
   //
   //    isMount.current = true;
   // }, [categoryId, selectedSort, currentPage]);

   const skeleton = [...new Array(8)].map((_, i) => <Skeleton key={i} />);
   const pizzas = items.map((pizza: any) => (
      <Link key={pizza.id} to={`/pizza/${pizza.id}`}>
         <PizzaBlock {...pizza} />
      </Link>
   ));

   return (
      <div className='content'>
         <div className='container'>
            <div className='content__top'>
               <Categories categoryId={categoryId} clickCategory={clickCategory} />
               <Sort selectedSort={selectedSort} sortItems={sortItems} />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>{status === 'error' ? <Error /> : status === 'loading' ? skeleton : pizzas}</div>
            {status === 'success' && (
               <Pagination currentPage={currentPage} clickPagination={(page: any) => clickPagination(page)} />
            )}
         </div>
      </div>
   );
};

export default Home;
