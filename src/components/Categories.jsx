import React from 'react';

const Categories: React.FC = ({ categoryId, clickCategory }) => {
   const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

   return (
      <div className='categories'>
         <ul>
            {categories.map((item, i) => {
               return (
                  <li key={i} onClick={() => clickCategory(i)} className={categoryId === i ? 'active' : ''}>
                     {item}
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export default Categories;
