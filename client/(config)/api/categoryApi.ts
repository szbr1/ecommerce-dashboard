import { api } from './api';

const productApi = api.injectEndpoints({
  endpoints: builder => ({
    allCategoriesCount: builder.query({
      query: () => 'api/category/totalCategories',
      providesTags: ['Category'],
    }),
  }),
  overrideExisting: false,
});

export const { useAllCategoriesCountQuery } = productApi;
