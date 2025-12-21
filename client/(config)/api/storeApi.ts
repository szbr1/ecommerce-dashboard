import {api} from "./api";


const productApi = api.injectEndpoints({
     endpoints: (builder) => ({
        allStoresCount : builder.query({
            query: () => 'api/store/totalStores',
            providesTags: ['Store'],
            
        })
    }),
    overrideExisting: false
})


export const {useAllStoresCountQuery} = productApi

