import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import './scss/app.scss';

import Home from './pages/Home';
import Header from './components/Header';
import NotFound from './pages/NotFound';

function App() {
   return (
      <div className='wrapper'>
         <Header />
         <div className='content'>
            <div className='container'>
               <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='*' element={<NotFound />} />
               </Routes>
            </div>
         </div>
      </div>
   );
}

export default App;
