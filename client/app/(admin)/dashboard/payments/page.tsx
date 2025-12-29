'use client';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PaymentChart } from '../_components/paymentChart';
import TableComponent from '../_components/TableComponent';
import { useGetOrdersQuery } from '@/(config)/api/ordersApi';
import { useGetPaymentCountsQuery } from '@/(config)/api/countsApi';

function Page() {
  const { data: orders, isLoading, isError } = useGetOrdersQuery();
  const { data } = useGetPaymentCountsQuery();
  
  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error</div>
  

  return (
      <div className="gap-3 p-3 flex flex-col">
      <div className="flex gap-3">
        <div className="grid w-full grid-cols-2  gap-3 ">
          <Card>
            <CardHeader>
              <CardTitle>Total Sales</CardTitle>
              <CardDescription>{data && data.TotalSales}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Failed</CardTitle>
              <CardDescription>{data && data.FailedSales}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Return</CardTitle>
              <CardDescription>{data && data.ReturnSales}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="w-3/6 hidden lg:block">
          <Card>
            <PaymentChart />
          </Card>
        </div>
      </div>

     
     {
        orders && <TableComponent orders={orders} rm={true} />
     }

     
      
    </div>
  );
}

export default Page;
