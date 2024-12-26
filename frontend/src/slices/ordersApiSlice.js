import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: {...order},
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    })
  })
});
// which is injecting endpoints to apiSlice's endpoint which is connected to our store

export const {useCreateOrderMutation, useGetOrderDetailsQuery} = ordersApiSlice;
// that's all we have to do in order to fetch the order details.