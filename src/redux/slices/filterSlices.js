import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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

export const { setCategoryId, setSelectedSort, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
