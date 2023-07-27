import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
   const { currentPage, category, selectedSort, selectedDirection, searchValue } = params;
   const { data } = await axios.get<Pizza[]>(
      `https://639f35a97aaf11ceb8954a67.mockapi.io/Themes?page=${currentPage}&limit=8${category}&sortBy=${selectedSort}&order=${selectedDirection}&search=${searchValue}`
   );

   return data;
});

const initialState: PizzaSliceState = {
   items: [],
   status: Status.LOADING
};

const doublePizza = createSlice({
   name: 'doublePizza',
   initialState,
   reducers: {
      setItems() {}
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
});

export const { setItems } = doublePizza.actions;
export default doublePizza.reducer;
