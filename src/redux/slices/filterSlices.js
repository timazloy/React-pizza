import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   categoryId: 0,
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
      }
   }
});

export const { setCategoryId, setSelectedSort } = filterSlice.actions;
export default filterSlice.reducer;
