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
import { Order } from '@/utils/ApiTypes';
import { GetDate, handleEditabble } from '@/utils/StoreUtils';
import { useRouter } from 'next/navigation';

function TableSectionComponent({ orders }: { orders: Order[] }) {
  const route = useRouter();

  return (
    <div>
      {orders.length === 0 && (
        <h1 className="text-3xl pt-12 w-full h-full text-center  ">
          Not Found
        </h1>
      )}

      {orders.length > 0 && (
        <Table>
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
                <TableRow
                  onClick={() => route.push(`/dashboard/orders/${order.id}`)}
                >
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{GetDate(order.createdAt)}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    <Select defaultValue={order.paymentStatus}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="PAID">Paid</SelectItem>
                          <SelectItem value="UNPAID">Unpaid</SelectItem>
                          <SelectItem value="RETURN">Return</SelectItem>
                          <SelectItem value="COMPLETED">Completed</SelectItem>
                          <SelectItem value="FAILED">Failed</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>
                    <p
                      className={cn(
                        order.trackingId == 'not assigned' &&
                          'text-red-600 dark:focus:text-red-300',
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
                    <Select defaultValue={order.deliveryStatus}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="SHIPPED">Shipped</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{order.user.email}</TableCell>
                  <TableCell>N/A</TableCell>
                  <TableCell>Hello</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default TableSectionComponent;
