import { useGetRecnetOrdersQuery } from '@/(config)/api/ordersApi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';


function LastOrders() {
  const {data: orders} = useGetRecnetOrdersQuery()
  return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders && orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>#{order.id}</TableCell>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>{order.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}

export default LastOrders;
