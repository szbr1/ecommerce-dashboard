import {api} from "./api";


const paymentApi = api.injectEndpoints({
     endpoints: (builder) => ({
        getTotalSalesCount : builder.query({
            query: ()=> "api/payment/getTotalSalesCount"
        })
    }),
    overrideExisting: false
})


export const {useGetTotalSalesCountQuery} = paymentApi

