'use client';

import ShortHeader from '../_components/header';
import ProductGridCol from '../_components/productsGridCol';
import { useGetProductsQuery } from '@/(config)/api/productsApi';

function Page() {
  const { data, isLoading, isError } = useGetProductsQuery({});

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  console.log(data);
  return (
    <div className="">
      <div>
        <ShortHeader btnText="Create" title="Products" />
      </div>
      <div className="lg:p-4 p-2">
        <ProductGridCol products={data.result} />
      </div>
    </div>
  );
}

export default Page;
