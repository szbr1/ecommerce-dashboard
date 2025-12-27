import {api} from "./api";


const productApi = api.injectEndpoints({
     endpoints: (builder) => ({
        allUsersCount : builder.query({
            query: () => 'api/user/totalUsers',
            providesTags: ['User']
        }),
    }),
    overrideExisting: false
})

export const { useAllUsersCountQuery} = productApi

