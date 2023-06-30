import React from 'react';
import styles from './Search.module.scss';

function Search({ searchValue, setSearchValue }) {
   return (
      <input
         className={styles.input}
         value={searchValue}
         onChange={(e) => setSearchValue(e.target.value)}
         type='text'
         placeholder='Найти пиццу...'
      />
   );
}

export default Search;
