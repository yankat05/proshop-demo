import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";


const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'};
// we can also pay with credit card through paypal system
// the initial state is cartItems with empty array.

// helping function for a good format of number


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;// item that is in the cart
      // checking if item is already in the cart
      // we can access anything that's in the state
      const existItem = state.cartItems.find((x) => x._id === item._id);
      // we update the quantity
      if (existItem) {
        state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x )
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return updateCart(state);
      // updeate the cart in the localStorage
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
      // it'll update to localstorage
    }
  },
});
// for payment 
// once the order is created , we want to clear the cart.

// action.payload is the id of what we want to delete.

// as a reducer function it takes two things, state is whatever the current state is of the cart, action will include any data inside of a payload,

// we can send items to addToCart , then we can access with action.payload (that'll be the item including the field )

// removeFromCart takes in the state, and action , and the id that we're going to pass to this removefromcart is gonna be in the actions payload.

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod,clearCartItems } = cartSlice.actions;
// we're gonna export functions as actions

export default cartSlice.reducer;








// those endpoints that are dealing with asynchronous request, but this one not, we don't need to use createApi ,we can simply use createSlice

// this createSlice will have name, initialState, reducers: {} that will have functions that have to do with the cart , add to cart or remove.