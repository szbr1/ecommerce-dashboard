"use client"

import { StoresSalesChart } from '../_components/top-stores';
import LastOrders from '../_components/latest-orders';
import { RevenueGraph } from '../_components/revenue-graph';
import CardsComponent from './_components/CardsComponent';

function page() {
  
  return (
    <div className="min-h-screen w-full  flex flex-col p-3">
      
      <CardsComponent cols />

      <div className="mt-8 grid gap-2 grid-cols-2 lg:grid-cols-3 ">
        {/* TOP STORES  */}
       <div className='flex flex-col gap-8' >
        <p className='font-semibold pb-3 h-10 w-full dark:bg-zinc-900 bg-zinc-100 pt-3 rounded-sm px-2 flex items-center'>Top Stores</p>
       <StoresSalesChart />
        </div>

        {/* LATEST ORDERS */}
        <div className='flex flex-col gap-8' >
        <p className='font-semibold pb-3 h-10 w-full dark:bg-zinc-900 bg-zinc-100 pt-3 rounded-sm px-2 flex items-center'>Latest Orders</p>
        <LastOrders />
        </div>

        {/* YEARLY REVENUE  */}
         <div className='flex flex-col gap-8' >
        <p className='font-semibold pb-3 h-10 w-full dark:bg-zinc-900 bg-zinc-100 pt-3 rounded-sm px-2 flex items-center'>Revenue</p>
        <RevenueGraph />
        </div>
        
      </div>
    </div>
  );
}

export default page;
