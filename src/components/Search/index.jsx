import React from 'react';
import styles from './Search.module.scss';
import { SearchContext } from '../../App';

function Search() {
   const { searchValue, setSearchValue } = React.useContext(SearchContext);

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
