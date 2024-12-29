import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// it injecting endpoints to main apiSlice
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: `PUT`,
        body: data,
      }),
    })
  }),
});
// we pass in the data because we're going to ge sending the data to the auth endpoints 
// as we make a post request to login , instead of query , we use mutation

// the name of the query is getProducts but to export this , we need to use, useGetProductsQuery
// now we should be able to dispatch this login action from our login screen
export const { useLoginMutation, useLogoutMutation, useRegisterMutation,useProfileMutation } = usersApiSlice;