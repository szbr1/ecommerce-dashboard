'use client';
import { useGetOrderQuery } from '@/(config)/api/orderApi';

function page() {
  const { data: order, isLoading, isError } = useGetOrderQuery({});
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  console.log('data:', order);

  if (!order) return <div>Invalid Order Id Found.</div>;
  return (
    <div className="grid gird-cols-1 md:grid-cols-2 px-3  py-6 gap-5 ">
      <div>
        <div className="flex justify-between items-center">
          <h2>Order:</h2>
          <h2 className="min-w-[100px]">{order.id}</h2>
        </div>
        <div className="flex justify-between items-center">
          <h2>Customer Name:</h2>x
          <h2 className="min-w-[100px]">{order.user.name}</h2>
        </div>
        <hr className='my-2' />

        <div className="flex justify-between items-center">
          <h2>Province:</h2>
          <h2 className="min-w-[100px]">{order.address.province}</h2>
        </div>
        <div className="flex justify-between items-center">
          <h2>State:</h2>
          <h2 className="min-w-[100px]">{order.address.state}</h2>
        </div>
        <div className="flex justify-between items-center">
          <h2>Street One:</h2>
          <h2 className="min-w-[100px]">{order.address.street1}</h2>
        </div>
        {order.address.street2 && (
          <div className="flex justify-between items-center">
            <h2>Street One:</h2>
            <h2 className="min-w-[100px]">{order.address.street1}</h2>
          </div>
        )}
        <hr  className='my-2'/>
        {/* TODO  */}
        <div className="flex justify-between items-center">
          <h2>Contact One:</h2>
          <h2 className="min-w-[100px]">+92-239247238</h2>
        </div>
        <div className="flex justify-between items-center">
          <h2>Contact Two:</h2>
          <h2 className="min-w-[100px]">+92-239247238</h2>
        </div>
      </div>
      <div className=" flex flex-col gap-3">
        {order.orderItems.map(order => (
          <div className="flex gap-3 justify-between items-center">
            <div className="flex gap-3">
              <div className="size-18 rounded-md overflow-hidden">
                <img
                  src={'/avatar.png'}
                  alt=""
                  height={10}
                  width={10}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">{order.product.title}</h1>
                <p className="text-sm opacity-50">{order.product.subTitle}</p>
                <h3>
                  Price:{' '}
                  <span className="font-semibold text-amber-700">${order.product.price}</span>
                </h3>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
                <div>Quantity: {order.quantity}</div>
            {
                order.product.size && order.product.size.length > 0 && <h3>Size: {order.product.size?.map(s => (s))}</h3>
            }
            </div>
            
          </div>
        ))}

        <hr />

        <div className='w-full flex justify-end'>
            <div className=' min-w-60 md:text-lg md:min-w-80'>
                <div className='flex justify-between items-center'>
                    <h4>Quantity:</h4>
                    <h3 className='font-semibold'>3</h3>
                </div>
                <div className='flex justify-between items-center'>
                    <h4>Products Total:</h4>
                    <h3 className='font-semibold text-amber-700'>$800</h3>
                </div>
                <div className='flex justify-between items-center'>
                    <h4>Coupon:</h4>
                    <h3 className='font-semibold'></h3>
                </div>
                <div className='flex justify-between items-center'>
                    <h4>Delivery:</h4>
                    <h3 className='font-semibold text-amber-700'>$10</h3>
                </div>
                <hr className='py-2 mt-2' />
                <div className='flex bg-amber-800 px-2 justify-between items-center'>
                    <h4>Total:</h4>
                    <h3 className='font-semibold'>$810</h3>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default page;
