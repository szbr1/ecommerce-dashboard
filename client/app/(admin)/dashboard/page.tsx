"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StoresSalesChart } from '../_components/top-stores';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import LastOrders from '../_components/latest-orders';
import { RevenueGraph } from '../_components/revenue-graph';
const karlo = [
  {
    value: 100,
    title: 'Total Stores',
  },
  {
    value: 5888,
    title: 'Total Products',
  },
  {
    value: 499,
    title: 'Total Users',
  },
  {
    value: 20,
    title: 'Total Categories',
  },
];
function page() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="min-h-screen w-full  flex flex-col p-3">
      <Button
        variant="outline"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="my-8"
      >
        Dark Mode
      </Button>
      <div className="grid gap-2 lg:gap-5 grid-cols-2 lg:grid-cols-4">
        {karlo.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className='text-lg md:text-xl: lg:text-2xl '>{item.title}</CardTitle>
              <CardDescription>{item.value}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

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
        <p className='font-semibold pb-3 h-10 w-full dark:bg-zinc-900 bg-zinc-100 pt-3 rounded-sm px-2 flex items-center'>Latest Orders</p>
        <RevenueGraph />
        </div>
        
      </div>
    </div>
  );
}

export default page;
