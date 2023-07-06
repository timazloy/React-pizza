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
      clearCart(state, action) {
         state.cartItems = [];
         cartSlice.caseReducers.calcTotalCount(state);
         cartSlice.caseReducers.calcTotalPrice(state);
      },
      onDeleteItem(state, action) {
         const { id, type, size } = action.payload;

         state.cartItems = state.cartItems.filter((item) => {
            return item.id !== id || item.type !== type || item.size !== size;
         });

         cartSlice.caseReducers.calcTotalCount(state);
         cartSlice.caseReducers.calcTotalPrice(state);
      },

      calcTotalPrice(state, action) {
         state.totalPrice = state.cartItems.reduce((sum, obj) => {
            return sum + obj.price * obj.count;
         }, 0);
      },
      calcTotalCount(state, action) {
         state.totalCount = state.cartItems.reduce((sum, obj) => {
            return sum + obj.count;
         }, 0);
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

         cartSlice.caseReducers.calcTotalCount(state);
         cartSlice.caseReducers.calcTotalPrice(state);
      }
   }
});

export const { addToCart, onPlusCount, onMinusCount, onDeleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
