import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Sort = {
   name: string;
   sort: string;
   direction: string;
};

export interface FilterSliceState {
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
      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload;
      },
      setCategoryId(state, action: PayloadAction<number>) {
         state.categoryId = action.payload;
      },
      setSelectedSort(state, action: PayloadAction<Sort>) {
         state.sort = action.payload;
      },
      setCurrentPage(state, action: PayloadAction<number>) {
         state.currentPagePaginate = action.payload;
      },
      setFilters(state, action: PayloadAction<{ searchValue: string; currentPage: string; sort: Sort; categoryId: string }>) {
         state.currentPagePaginate = Number(action.payload.currentPage);
         state.sort = action.payload.sort;
         state.searchValue = action.payload.searchValue;
         state.categoryId = Number(action.payload.categoryId);
      }
   }
});

export const { setCategoryId, setSelectedSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;
