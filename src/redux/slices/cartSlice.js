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
   reducers: {}
});

export const { setCategoryId, setSelectedSort, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
