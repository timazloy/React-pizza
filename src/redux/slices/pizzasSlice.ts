import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzasStatus', async (params) => {
   const { currentPage, category, activeSort, selectedDirection, searchValue } = params;
   const { data } = await axios.get<Pizza[]>(
      `https://639f35a97aaf11ceb8954a67.mockapi.io/Themes?page=${currentPage}&limit=8${category}&sortBy=${activeSort}&order=${selectedDirection}&search=${searchValue}`
   );

   return data;
});

interface PizzaSliceState {
   items: Pizza[];
   status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
   items: [],
   status: 'loading'
};

const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems(state, action: PayloadAction<Pizza>) {
         state.items = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchPizzas.pending, (state, action) => {
         state.status = 'loading';
         state.items = [];
      });
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
         state.items = action.payload;
         state.status = 'success';
      });
      builder.addCase(fetchPizzas.rejected, (state, action) => {
         state.status = 'error';
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
