import React from 'react';

type sortItems = {
   name: string;
   sort: string;
   direction: string;
};

export const sortSettingItems: sortItems[] = [
   {
      name: 'популярности (DESC)',
      sort: 'rating',
      direction: 'desc'
   },
   {
      name: 'популярности (ASC)',
      sort: 'rating',
      direction: 'asc'
   },
   {
      name: 'цене (DESC)',
      sort: 'price',
      direction: 'desc'
   },
   {
      name: 'цене (ASC)',
      sort: 'price',
      direction: 'asc'
   },
   {
      name: 'алфавиту (DESC)',
      sort: 'title',
      direction: 'desc'
   },
   {
      name: 'алфавиту (ASC)',
      sort: 'title',
      direction: 'asc'
   }
];

type SortProps = {
   selectedSort: any;
   sortItems: any;
};

type PopupClick = MouseEvent & {
   path: Node[];
};

export const Sort: React.FC<SortProps> = React.memo(({ selectedSort, sortItems }) => {
   const [openSort, setOpenSort] = React.useState(false);
   const sortRef = React.useRef<HTMLDivElement>(null);

   React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         const _event = event as PopupClick;

         if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
            setOpenSort(false);
         }
      };

      document.body.addEventListener('click', handleClickOutside);

      return () => {
         document.body.removeEventListener('click', handleClickOutside);
      };
   }, []);

   const activeSort = selectedSort.name;

   const clickSortItem = (obj: sortItems) => {
      sortItems(obj);
      setOpenSort(false);
   };

   return (
      <div className='sort' ref={sortRef}>
         <div className='sort__label' onClick={() => setOpenSort(!openSort)}>
            <svg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
               <path
                  d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
                  fill='#2C2C2C'
               />
            </svg>
            <b>Сортировка по:</b>
            <span>{activeSort}</span>
         </div>
         {openSort && (
            <div className='sort__popup'>
               <ul>
                  {sortSettingItems.map((sortItem, i) => (
                     <li
                        onClick={() => clickSortItem(sortItem)}
                        key={i}
                        className={selectedSort.name === sortItem.name ? 'active' : ''}
                     >
                        {sortItem.name}
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
});
