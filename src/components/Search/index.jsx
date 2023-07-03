import React from 'react';
import styles from './Search.module.scss';
import close from '../../assets/img/close.svg';
import { SearchContext } from '../../App';

function Search() {
   const { searchValue, setSearchValue } = React.useContext(SearchContext);

   return (
      <div className={styles.wrapper}>
         <input
            className={searchValue ? `${styles.input} ${styles.active}` : styles.input}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type='text'
            placeholder='Найти пиццу...'
         />
         {searchValue && (
            <button onClick={() => setSearchValue('')} className={styles.close} type='button'>
               <img src={close} alt='close' />
            </button>
         )}
      </div>
   );
}

export default Search;
