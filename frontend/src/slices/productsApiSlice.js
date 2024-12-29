import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// it injecting endpoints to main apiSlice
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product']
    })
  }),
});
// invalidatesTags: ["Product"], what this will do, it will stop it from being cached , so that we have fresh data.
// if we don't put this, we'll have to reload the page after we click create new product.


// the name of the query is getProducts but to export this , we need to use, useGetProductsQuery

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation } = productsApiSlice;