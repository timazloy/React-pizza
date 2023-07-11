import React from 'react';
import styles from './Search.module.scss';
import close from '../../assets/img/close.svg';
import debounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlices';

function Search() {
   const dispatch = useDispatch();
   const [value, setValue] = React.useState();

   const searchValue = useSelector((state) => state.filter);
   const inputRef = React.useRef();

   const updateSearchValue = React.useCallback(
      debounce((str) => {
         dispatch(setSearchValue(str));
      }, 300),
      []
   );

   const onChangeInput = (e) => {
      setValue(e);
      dispatch(setSearchValue(e));
      updateSearchValue(e);
   };

   const clearSearchField = () => {
      setValue('');
      dispatch(setSearchValue(''));
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
