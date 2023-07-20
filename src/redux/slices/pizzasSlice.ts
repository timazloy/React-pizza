import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Sort } from './filterSlices';

type Pizza = {
   id: string;
   imageUrl: string;
   title: string;
   description: string;
   price: string;
   rating: string;
   types: number[];
   sizes: number[];
};

export type SearchPizzaParams = {
   currentPage: string;
   category: string;
   activeSort: Sort;
   selectedDirection: string;
   searchValue: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
   const { currentPage, category, activeSort, selectedDirection, searchValue } = params;
   const { data } = await axios.get<Pizza[]>(
      `https://639f35a97aaf11ceb8954a67.mockapi.io/Themes?page=${currentPage}&limit=8${category}&sortBy=${activeSort}&order=${selectedDirection}&search=${searchValue}`
   );

   return data;
});

enum Status {
   LOADING = 'loading',
   SUCCESS = 'success',
   ERROR = 'error'
}

interface PizzaSliceState {
   items: Pizza[];
   status: Status;
}

const initialState: PizzaSliceState = {
   items: [],
   status: Status.LOADING
};

const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems(state, action: PayloadAction<Pizza[]>) {
         state.items = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchPizzas.pending, (state, action) => {
         state.status = Status.LOADING;
         state.items = [];
      });
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
         state.items = action.payload;
         state.status = Status.SUCCESS;
      });
      builder.addCase(fetchPizzas.rejected, (state, action) => {
         state.status = Status.ERROR;
         state.items = [];
      });
   }
   // extraReducers: {
   //    [fetchPizzas.pending]: (state) => {
   //       state.status = 'loading';
   //       state.items = [];
   //    },
   //    [fetchPizzas.fulfilled]: (state, action) => {
   //       state.items = action.payload;
   //       state.status = 'success';
   //    },
   //    [fetchPizzas.rejected]: (state) => {
   //       state.status = 'error';
   //       state.items = [];
   //    }
   // }
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
