import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   totalPrice: 0,
   totalTheSamePizzas: 0,
   totalCount: 0,
   cartItems: []
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart(state, action) {
         const findItem = state.cartItems.find((obj) => {
            if (obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type) return obj;
         });

         if (findItem) {
            findItem.count++;
         } else {
            state.cartItems.push(action.payload);
         }

         state.totalCount = state.cartItems.reduce((sum, obj) => {
            return sum + obj.count;
         }, 0);

         state.totalPrice = state.cartItems.reduce((sum, obj) => {
            return sum + obj.price;
         }, 0);
      }
   }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
