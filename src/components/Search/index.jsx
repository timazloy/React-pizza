import React from 'react';
import styles from './Search.module.scss';
import close from '../../assets/img/close.svg';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

function Search() {
   const [value, setValue] = React.useState();
   const { searchValue, setSearchValue } = React.useContext(SearchContext);
   const inputRef = React.useRef();

   const updateSearchValue = React.useCallback(
      debounce((str) => {
         setSearchValue(str);
      }, 300),
      []
   );

   const onChangeInput = (e) => {
      setValue(e);
      updateSearchValue(e);
   };

   const clearSearchField = () => {
      setSearchValue('');
      setValue('');
      inputRef.current.focus();
   };

   return (
      <div className={styles.wrapper}>
         <input
            ref={inputRef}
            className={searchValue ? `${styles.input} ${styles.active}` : styles.input}
            value={value}
            onChange={(e) => onChangeInput(e.target.value)}
            type='text'
            placeholder='Найти пиццу...'
         />
         {searchValue && (
            <button onClick={() => clearSearchField()} className={styles.close} type='button'>
               <img src={close} alt='close' />
            </button>
         )}
      </div>
   );
}

export default Search;
