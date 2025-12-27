import { orders } from "@/constants/orders"
import CardRowSectionComponent from "../_components/CardRowSectionComponent"
import TableComponent from "../_components/TableComponent"

function Page() {
  return (
    <div className="flex flex-col">
     
     <CardRowSectionComponent/>
     <TableComponent orders={orders}/>
    </div>
  )
}

export default Page