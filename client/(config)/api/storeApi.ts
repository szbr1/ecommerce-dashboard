import {api} from "./api";


const productApi = api.injectEndpoints({
     endpoints: (builder) => ({
        allStoresCount : builder.query({
            query: () => 'api/store/totalStores',
        }),
        getStore: builder.query( ({
            query: ()=> "api/store/getStore",
            providesTags: ['Store'],
        })),
        updateProfle: builder.mutation({
            query: (data)=>({
                url: "api/store/updateProfile",
                method: "PATCH",
                body: data
            })
        }),
        getProfle : builder.query(({
            query: ()=> "api/store/getProfile"
        })),
        getTotalFollowersCount: builder.query({
            query: ()=> "api/order/getFollowers"
        }),
        getPositiveReviews : builder.query({
            query: ()=> "getPositiveReviews"
        })
    }),
    overrideExisting: false
})


export const {useAllStoresCountQuery, useGetStoreQuery,useGetProfleQuery, useGetPositiveReviewsQuery, useGetTotalFollowersCountQuery} = productApi

