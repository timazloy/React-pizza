import React from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
   categoryId: number;
   clickCategory: (i: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, clickCategory }) => {
   const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

   useWhyDidYouUpdate('Categories', { categoryId, clickCategory });

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
});
