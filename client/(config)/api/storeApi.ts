import { StoreProfile } from "@/utils/ApiTypes";
import {api} from "./api";


const productApi = api.injectEndpoints({
     endpoints: (builder) => ({
        allStoresCount : builder.query({
            query: () => 'api/store/totalStores',
        }),
        getStore: builder.query<StoreProfile , void>( ({
            query: ()=> "api/store/getStore",
            providesTags: ['Store'],
        })),
        updateStore: builder.mutation({
            query: (data)=>({
                url: "api/store/update",
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Store"]
        }),
        getTotalFollowersCount: builder.query({
            query: ()=> "api/order/getFollowers"
        }),
        getPositiveReviews : builder.query({
            query: ()=> "getPositiveReviews"
        })
    }),
    overrideExisting: false
})


export const {useAllStoresCountQuery, useGetStoreQuery, useUpdateStoreMutation, useGetPositiveReviewsQuery, useGetTotalFollowersCountQuery} = productApi

