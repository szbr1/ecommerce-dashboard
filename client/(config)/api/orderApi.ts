import { Order } from "@/utils/StoreApiTypes";
import { api } from "./api";

export const OrderApi = api.injectEndpoints({
    endpoints: (builder)=>({
        getOrder : builder.query<Order, void>({
            query: ()=> "api/order/getOrder",
            providesTags: ["Orders"]
        })
    })
})
export const {useGetOrderQuery} = OrderApi
