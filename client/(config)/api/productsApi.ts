import { api } from './api';

const productApi = api.injectEndpoints({
  endpoints: builder => ({
    allProductsCount: builder.query({
      query: () => 'api/product/totalProducts',
      providesTags: ['Product'],
    }),

    createProduct: builder.mutation({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'api/product/create',
      }),
    }),

    updateProduct: builder.mutation({
      query: data => ({
        body: data,
        method: 'PATCH',
        url: 'api/product/update',
      }),
    }),

    deleteProduct: builder.mutation({
      query: ({productId}) => ({
        body: {productId},
        method: 'DELETE',
        url: 'api/product/delete',
      }),
    }),

    getProducts: builder.query({
      query: ({ limit, page }) =>
        `api/product/getProducts?storeId=1&limit=${limit}&page=${page}`,
      providesTags: ['Products'],
    }),

    getTotalCountProducts : builder.query({
      query: ()=>"api/product/productCount"
    })
  }),

  overrideExisting: false,
});

export const {
  useAllProductsCountQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useGetTotalCountProductsQuery
} = productApi;
