import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
   const { currentPage, category, activeSort, selectedDirection, searchValue } = params;
   const { data } = await axios.get(
      `https://639f35a97aaf11ceb8954a67.mockapi.io/Themes?page=${currentPage}&limit=8${category}&sortBy=${activeSort}&order=${selectedDirection}&search=${searchValue}`
   );

   return data;
});

const initialState = {
   items: [],
   status: 'loading'
};

const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems(state, action) {
         state.items = action.payload;
      }
   },
   extraReducers: {
      [fetchPizzas.pending]: (state) => {
         state.state = 'loading';
         state.items = [];
      },
      [fetchPizzas.fulfilled]: (state, action) => {
         state.items = action.payload;
         state.status = 'success';
      },
      [fetchPizzas.rejected]: (state, action) => {
         state.status = 'error';
         state.items = [];
      }
   }
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
