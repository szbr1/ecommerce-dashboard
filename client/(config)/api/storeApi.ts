import {api} from "./api";


const productApi = api.injectEndpoints({
     endpoints: (builder) => ({
        allStoresCount : builder.query({
            query: () => 'api/store/totalStores',
        }),
        getStore: builder.query( ({
            query: ()=> "api/store/getStore?storeId=1",
            providesTags: ['Store'],
        }))
    }),
    overrideExisting: false
})


export const {useAllStoresCountQuery, useGetStoreQuery} = productApi

