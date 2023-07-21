import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
   id: string;
   title: string;
   img: string;
   price: string;
   type: string;
   size: number;
   count: number;
};

interface CartSliceState {
   totalPrice: number;
   totalCount: number;
   cartItems: CartItem[];
}

const initialState: CartSliceState = {
   totalPrice: 0,
   totalCount: 0,
   cartItems: []
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      clearCart(state, action: PayloadAction<undefined>) {
         state.cartItems = [];
         cartSlice.caseReducers.calcTotalCount(state, action);
         cartSlice.caseReducers.calcTotalPrice(state, action);
      },
      onDeleteItem(state, action) {
         const { id, type, size } = action.payload;

         state.cartItems = state.cartItems.filter((item) => {
            return item.id !== id || item.type !== type || item.size !== size;
         });

         cartSlice.caseReducers.calcTotalCount(state, action);
         cartSlice.caseReducers.calcTotalPrice(state, action);
      },

      calcTotalPrice(state, action) {
         state.totalPrice = state.cartItems.reduce((sum, obj) => {
            return sum + Number(obj.price) * Number(obj.count);
         }, 0);
      },
      calcTotalCount(state, action) {
         state.totalCount = state.cartItems.reduce((sum, obj) => {
            return sum + obj.count;
         }, 0);
      },
      onMinusCount(state, action: PayloadAction<{ id: string; type: string; size: number }>) {
         const { id, type, size } = action.payload;
         state.cartItems.find((obj) => {
            if (obj.id === id && obj.size === size && obj.type === type) obj.count--;
         });
         cartSlice.caseReducers.calcTotalCount(state, action);
         cartSlice.caseReducers.calcTotalPrice(state, action);
      },
      onPlusCount(state, action: PayloadAction<{ id: string; type: string; size: number }>) {
         const { id, type, size } = action.payload;
         state.cartItems.filter((obj) => {
            if (obj.id === id && obj.size === size && obj.type === type) obj.count++;
         });
         cartSlice.caseReducers.calcTotalCount(state, action);
         cartSlice.caseReducers.calcTotalPrice(state, action);
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

         cartSlice.caseReducers.calcTotalCount(state, action);
         cartSlice.caseReducers.calcTotalPrice(state, action);
      }
   }
});

export const selectedCart = (state: RootState) => state.cart;

export const { addToCart, onPlusCount, onMinusCount, onDeleteItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
