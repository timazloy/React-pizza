import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlices';

export const store = configureStore({
   reducer: { filter }
});
