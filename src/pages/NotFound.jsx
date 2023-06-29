import React from 'react';
import '../scss/app.scss';
import '../App.css';
import NotFoundGif from '../assets/img/travolta.gif';

function NotFound() {
   return (
      <div className='not-found'>
         <div className='not-found__title'>Страница не найдена</div>
         <img src={NotFoundGif} alt='404-image' />
      </div>
   );
}

export default NotFound;
