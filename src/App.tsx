import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import './scss/app.scss';

import Home from './pages/Home';
import { Loading, Header } from './components/';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart"*/ './pages/Cart/Cart'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound"*/ './pages/NotFound'));
const Pizza = React.lazy(() => import(/* webpackChunkName: "Pizza"*/ './pages/Pizza/Pizza'));
const DoublePizzaCreate = React.lazy(
   () => import(/* webpackChunkName: "DoublePizzaCreate"*/ './pages/DoublePizzaCreate/DoublePizzaCreate')
);
const CreatePizza = React.lazy(() => import(/* webpackChunkName: "CreatePizza"*/ './pages/CreatePizza/CreatePizza'));

function App() {
   return (
      <div className='wrapper'>
         <Header />
         <div className='content'>
            <div className='container'>
               <React.Suspense fallback={<Loading />}>
                  <Routes>
                     <Route path='/' element={<Home />} />
                     <Route path='*' element={<NotFound />} />
                     <Route path='/cart' element={<Cart />} />
                     <Route path='/pizza/:id' element={<Pizza />} />
                     <Route path='/double_pizza' element={<DoublePizzaCreate />} />
                     <Route path='/create_pizza' element={<CreatePizza />} />
                  </Routes>
               </React.Suspense>
            </div>
         </div>
      </div>
   );
}

export default App;
