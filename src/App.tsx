import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import './scss/app.scss';

import Home from './pages/Home';
import Header from './components/Header';
import Loading from './components/Loading/Loading';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart"*/ './pages/Cart/Cart'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound"*/ './pages/NotFound'));
const Pizza = React.lazy(() => import(/* webpackChunkName: "Pizza"*/ './pages/Pizza/Pizza'));

function App() {
   return (
      <div className='wrapper'>
         <Header />
         <div className='content'>
            <div className='container'>
               <Routes>
                  <Route path='/' element={<Home />} />
                  <Route
                     path='*'
                     element={
                        <React.Suspense fallback={<Loading />}>
                           <NotFound />
                        </React.Suspense>
                     }
                  />
                  <Route
                     path='/cart'
                     element={
                        <React.Suspense fallback={<Loading />}>
                           <Cart />
                        </React.Suspense>
                     }
                  />
                  <Route
                     path='/pizza/:id'
                     element={
                        <React.Suspense fallback={<Loading />}>
                           <Pizza />
                        </React.Suspense>
                     }
                  />
               </Routes>
            </div>
         </div>
      </div>
   );
}

export default App;
