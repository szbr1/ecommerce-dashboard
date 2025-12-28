"use client"
import CardRowSectionComponent from "../_components/CardRowSectionComponent"
import TableComponent from "../_components/TableComponent"
import { useGetOrdersQuery } from "@/(config)/api/ordersApi"

function Page() {
  const {data, isLoading, isError} = useGetOrdersQuery()

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error</div>
  console.log(data)
  return (
    <div className="flex flex-col">
     
     <CardRowSectionComponent/>
     <TableComponent orders={data}/>
    </div>
  )
}

export default Page