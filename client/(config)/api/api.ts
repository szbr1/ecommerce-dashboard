import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
    tagTypes: ['Product', 'User', 'Category', 'Store'],
    endpoints: (builder) => ({
        allProductsCount : builder.query({
            query: () => 'api/product/totalProducts',
            providesTags: ['Product']
        }),
        allUsersCount : builder.query({
            query: () => 'api/user/totalUsers',
            providesTags: ['User']
        }),
        allCategoriesCount : builder.query({
            query: () => 'api/category/totalCategories',
            providesTags: ['Category']
        }),
        allStoresCount : builder.query({
            query: () => 'api/store/totalStores',
            providesTags: ['Store'],
            
        })
    })
})


export const {useAllProductsCountQuery, useAllUsersCountQuery, useAllCategoriesCountQuery, useAllStoresCountQuery} = api
