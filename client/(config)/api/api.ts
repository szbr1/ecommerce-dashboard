import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
    tagTypes: ['Product', 'User', 'Category', 'Store', 'Products', 'Orders'],
    endpoints: () => ({})
})
