 "use client"
import {
  useGetOrderCountsQuery,
  useGetPaymentCountsQuery,
} from '@/(config)/api/countsApi';
import { useGetAllReviewsQuery } from '@/(config)/api/productsApi';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Props {
  cols?: boolean;
}
function CardsComponent({cols }: Props) {
  const { data: ordersCount } = useGetOrderCountsQuery();
  const { data: paymentsCount } = useGetPaymentCountsQuery();
  const { data: reviewsCount } = useGetAllReviewsQuery();


  if(!ordersCount || !paymentsCount || !reviewsCount) return <div>wait</div>
  return (
    <div
      className={cn(
        'grid gap-2 lg:gap-5 grid-cols-2',
        cols && 'lg:grid-cols-4'
      )}
    >
      
      <Card>
        <CardHeader>
          <CardTitle className="">Total Orders</CardTitle>
          <CardDescription>
            {paymentsCount && paymentsCount.TotalSales}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="">Followers</CardTitle>
          <CardDescription>23</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="">Positve Reviews</CardTitle>
          <CardDescription>{reviewsCount && reviewsCount.length}</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="">Total Orders</CardTitle>
          <CardDescription>{ordersCount && ordersCount.All}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default CardsComponent;
