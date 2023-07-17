import React from 'react';

type CategoriesProps = {
   categoryId: number;
   clickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ categoryId, clickCategory }) => {
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
