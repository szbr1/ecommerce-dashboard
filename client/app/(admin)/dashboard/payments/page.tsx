"use client"
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PaymentChart } from '../_components/paymentChart'
import { orders } from '@/constants/orders'
import TableComponent from '../_components/TableComponent'

function Page() {

    const or = orders.filter(order => order.status !== "unpaid")
  return (
    <div className='gap-3 p-3 flex flex-col'>
        <div className='flex gap-3'>

        <div className='grid w-full grid-cols-2  gap-3 '>
             <Card>
                 <CardHeader>
                     <CardTitle>
                        Revenue
                     </CardTitle>
                     <CardDescription>$237,9993</CardDescription>
                 </CardHeader>
             </Card>
              <Card>
                 <CardHeader>
                     <CardTitle>
                        Failed
                     </CardTitle>
                     <CardDescription>$237</CardDescription>
                 </CardHeader>
             </Card>
              <Card>
                 <CardHeader>
                     <CardTitle>
                        Return
                     </CardTitle>
                     <CardDescription>$237,9993</CardDescription>
                 </CardHeader>
             </Card>
              <Card>
                 <CardHeader>
                     <CardTitle>
                        Revenue
                     </CardTitle>
                     <CardDescription>$237,9993</CardDescription>
                 </CardHeader>
             </Card>
        </div>


        <div className='w-3/6 hidden lg:block'>
           <Card>
              <PaymentChart />
           </Card>
        </div>

        
                
        </div>
                    <TableComponent orders={or} rm={true} />
    </div>
  )
}

export default Page