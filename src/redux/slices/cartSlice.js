import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   totalPrice: 0,
   totalCount: 0,
   test: 0,
   cartItems: []
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      onMinusCount(state, action) {
         state.cartItems.find((obj) => {
            if (obj.id === action.payload[0] && obj.size === action.payload[2] && obj.type === action.payload[1]) obj.count--;
         });
      },
      onPlusCount(state, action) {
         state.cartItems.find((obj) => {
            if (obj.id === action.payload[0] && obj.size === action.payload[2] && obj.type === action.payload[1]) obj.count++;
         });
      },
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
            return sum + obj.price * obj.count;
         }, 0);
      }
   }
});

export const { addToCart, onPlusCount, onMinusCount } = cartSlice.actions;
export default cartSlice.reducer;
