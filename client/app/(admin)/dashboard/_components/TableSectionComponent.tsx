import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { GetDate, handleEditabble } from '@/utils/StoreUtils';
import { OrdersInterface } from '@/utils/types';
import { useRouter } from 'next/navigation';

function TableSectionComponent({ orders }: { orders: OrdersInterface[] }) {

  const route = useRouter()
  
  return (
    <div>
      {orders.length === 0 && (<h1 className='text-3xl pt-12 w-full h-full text-center  '>Not Found</h1>)}
      
    {orders.length > 0 && <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Totals</TableHead>
          <TableHead>Tracking</TableHead>
          <TableHead>Delivery</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Fulffilment</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders &&
          orders.length > 0 &&
          orders.map(order => (
            <TableRow onClick={()=>route.push(`/dashboard/orders/${order.id}`)}>
              <TableCell>#{order.id}</TableCell>
              <TableCell>{GetDate(order.date)}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>
                <Select defaultValue={order.status.toLowerCase()}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                      <SelectItem value="return">Return</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell>
                <p
                  className={cn(
                    order.trackingId == 'not assigned' && 'text-red-600 dark:focus:text-red-300',
                    'focus:outline-none h-full w-full focus:bg-zinc-100 dark:focus:bg-zinc-900 focus:border-2 py-2 px-1 rounded-md focus:flex justify-center items-center'
                  )}
                  onInput={e => handleEditabble(e, 3)}
                  suppressContentEditableWarning={true}
                  contentEditable
                >
                  {order.trackingId}
                </p>
              </TableCell>
              <TableCell>
                <Select defaultValue={order.deliveryStatus.toLowerCase()}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="delivered">delivered</SelectItem>
                      <SelectItem value="pending">pending</SelectItem>
                      <SelectItem value="shipped">shipped</SelectItem>
                      <SelectItem value="cancelled">cancelled</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>Hello</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>}
          </div>
  );
}

export default TableSectionComponent;
