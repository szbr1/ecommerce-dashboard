import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const orders = [
  {
    id: 1,
    productName: 'Product 1',
    price: '$100',
    store: 'Store 1',
  },
  {
    id: 2,
    productName: 'Product 2',
    price: '$200',
    store: 'Store 2',
  },
  {
    id: 3,
    productName: 'Product 3',
    price: '$300',
    store: 'Store 3',
  },
  {
    id: 4,
    productName: 'Product 4',
    price: '$400',
    store: 'Store 4',
  },
  {
    id: 5,
    productName: 'Product 5',
    price: '$500',
    store: 'Store 5',
  },
];

function LastOrders() {
  return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>name</TableHead>
            <TableHead>price</TableHead>
            <TableHead>store</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.productName}</TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>{order.store}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}

export default LastOrders;
