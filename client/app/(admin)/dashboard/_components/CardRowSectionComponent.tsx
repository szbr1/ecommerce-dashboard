import { useGetOrderCountsQuery } from '@/(config)/api/countsApi';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';

function CardRowSectionComponent() {
  const { data } = useGetOrderCountsQuery();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 p-2 gap-3 px-4">
      <Card>
        <CardHeader>
          <h2>Total Orders</h2>
        </CardHeader>
        <CardContent>
          <h5 className="text-xl md:text-2xl lg:text-4xl ">
            {data && data.All}
          </h5>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2>Complete Orders</h2>
        </CardHeader>
        <CardContent>
          <h5 className="text-xl md:text-2xl lg:text-4xl ">
            {data && data.Completed}
          </h5>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2>Failed Orders</h2>
        </CardHeader>
        <CardContent>
          <h5 className="text-xl md:text-2xl lg:text-4xl ">
            {data && data.Failed}
          </h5>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2>Return Orders</h2>
        </CardHeader>
        <CardContent>
          <h5 className="text-xl md:text-2xl lg:text-4xl ">
            {data && data.Return}
          </h5>
        </CardContent>
      </Card>
    </div>
  );
}

export default CardRowSectionComponent;
