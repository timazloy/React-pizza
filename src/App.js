import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import './scss/app.scss';

import Home from './pages/Home';
import Header from './components/Header';
import NotFound from './pages/NotFound';

export const SearchContext = React.createContext();

function App() {
   const [searchValue, setSearchValue] = React.useState('');

   return (
      <div className='wrapper'>
         <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <Header />
            <div className='content'>
               <div className='container'>
                  <Routes>
                     <Route path='/' element={<Home searchValue={searchValue} />} />
                     <Route path='*' element={<NotFound />} />
                  </Routes>
               </div>
            </div>
         </SearchContext.Provider>
      </div>
   );
}

export default App;
