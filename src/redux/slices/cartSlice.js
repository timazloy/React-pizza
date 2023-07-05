import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   totalPrice: 0,
   cartItems: []
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart(state, action) {
         state.cartItems.push(action.payload);
         state.totalPrice = state.cartItems.reduce((sum, obj) => {
            return sum + obj.price;
         }, 0);
      }
   }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
