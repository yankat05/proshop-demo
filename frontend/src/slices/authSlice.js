// we're not dealing with any endpoints , or any API stuff, that's going to go in another slice called user's API slice.
// this is simply to set the user credentials to local storage and remove them.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

// our redux state is almost always going to match up with what we have in local storage.

// we don't add productSlce and userSlice to the store because , that's the child of apiSlice

// to logout there two things to do, in the usersApiSlice we need to clear the token from the backend , then in the authSlice we need to remove userInfo from localStorage