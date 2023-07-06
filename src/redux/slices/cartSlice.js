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
      onDeleteItem(state, action) {
         const { id, type, size } = action.payload;

         state.cartItems = state.cartItems.filter((item) => {
            return item.id !== id || item.type !== type || item.size !== size;
         });
      },
      onMinusCount(state, action) {
         const { id, type, size } = action.payload;
         state.cartItems.find((obj) => {
            if (obj.id === id && obj.size === size && obj.type === type) obj.count--;
         });
      },
      onPlusCount(state, action) {
         const { id, type, size } = action.payload;
         state.cartItems.filter((obj) => {
            if (obj.id === id && obj.size === size && obj.type === type) obj.count++;
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

export const { addToCart, onPlusCount, onMinusCount, onDeleteItem } = cartSlice.actions;
export default cartSlice.reducer;
