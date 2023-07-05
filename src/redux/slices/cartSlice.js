import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   totalPrice: 1,
   cartItems: [
      {
         id: 1,
         title: 'pizza',
         img: 'https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg',
         price: 500,
         type: 'традиционное',
         size: 26
      },
      {
         id: 2,
         title: 'pizza2',
         img: 'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg',
         price: 501,
         type: 'тонкое',
         size: 28
      }
   ]
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {}
});

export const { setCategoryId, setSelectedSort, setCurrentPage, setFilters } = cartSlice.actions;
export default cartSlice.reducer;
