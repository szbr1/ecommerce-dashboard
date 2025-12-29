import { OrderCount, PaymentCount } from '@/utils/ApiTypes';
import { api } from './api';

export const CountApi = api.injectEndpoints({
  endpoints: builder => ({
    getPaymentCounts: builder.query<PaymentCount, void>({
      query: () => 'api/count/getPaymentCounts',
    }),
    getOrderCounts: builder.query<OrderCount, void>({
      query: () => 'api/count/getOrderCounts',
    }),
  }),
});
export const { useGetOrderCountsQuery, useGetPaymentCountsQuery } = CountApi;
