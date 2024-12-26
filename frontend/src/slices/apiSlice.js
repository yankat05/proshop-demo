// this is gonna be the parent to other api slices.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// fetchBaseQuery a function that allows us to make request to our api.
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({})
});

// we can do all through this builder , like try catch or handling error.

// we're gonna add this apiSlice to the store.

