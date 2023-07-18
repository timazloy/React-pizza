import { createSlice } from '@reduxjs/toolkit';

type Sort = {
   name: string;
   sort: string;
   direction: string;
};

interface FilterSliceState {
   searchValue: string;
   categoryId: number;
   currentPagePaginate: number;
   sort: Sort;
}

const initialState: FilterSliceState = {
   searchValue: '',
   categoryId: 0,
   currentPagePaginate: 1,
   sort: {
      name: 'популярности (DESC)',
      sort: 'rating',
      direction: 'desc'
   }
};

const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      setSearchValue(state, action) {
         state.searchValue = action.payload;
      },
      setCategoryId(state, action) {
         state.categoryId = action.payload;
      },
      setSelectedSort(state, action) {
         state.sort = action.payload;
      },
      setCurrentPage(state, action) {
         state.currentPagePaginate = action.payload;
      },
      setFilters(state, action) {
         state.currentPagePaginate = Number(action.payload.sortProperty);
         state.sort = action.payload.selectedSort;
         state.categoryId = Number(action.payload.categoryId);
      }
   }
});

export const { setCategoryId, setSelectedSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;
