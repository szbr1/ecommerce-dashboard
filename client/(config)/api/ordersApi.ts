import {
  ByMonthSales,
  ByYearSales,
  Order,
  RecentOrders,
} from '@/utils/ApiTypes';
import { api } from './api';

export const OrderApi = api.injectEndpoints({
  endpoints: builder => ({
    getOrder: builder.query<Order[], void>({
      query: () => 'api/order/getOrder',
      providesTags: ['Orders'],
    }),
    getOrders: builder.query<Order[], void>({
      query: () => 'api/order/getOrders',
    }),
    getTotalOrdersCount: builder.query({
      query: () => 'api/product/getTotalOrdersCount',
    }),
    getRecnetOrders: builder.query<RecentOrders[], void>({
      query: () => 'api/order/getRecentOrders',
    }),
    getSalesByYear: builder.query<ByYearSales, void>({
      query: () => 'api/order/getSalesByYear',
    }),
    getSalesByMonth: builder.query<ByMonthSales, void>({
      query: () => 'api/order/getSalesByMonth',
    }),
  }),
});
export const {
  useGetOrderQuery,
  useGetOrdersQuery,
  useGetRecnetOrdersQuery,
  useGetSalesByMonthQuery,
  useGetSalesByYearQuery,
} = OrderApi;
