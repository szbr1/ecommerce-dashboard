import CardRowSectionComponent from "../_components/CardRowSectionComponent"
import TableComponent from "../_components/TableComponent"
import { useGetOrdersQuery } from "@/(config)/api/ordersApi"

function Page() {
  const {data: orders} = useGetOrdersQuery({})
  return (
    <div className="flex flex-col">
     
     <CardRowSectionComponent/>
     <TableComponent orders={orders}/>
    </div>
  )
}

export default Page