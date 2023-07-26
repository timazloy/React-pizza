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
      setFilters(state, action) {
         state.currentPagePaginate = Number(action.payload.sortProperty);
         state.sort = action.payload.selectedSort;
         state.categoryId = Number(action.payload.categoryId);
      }
   }
});

export const { setCategoryId, setSelectedSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;
