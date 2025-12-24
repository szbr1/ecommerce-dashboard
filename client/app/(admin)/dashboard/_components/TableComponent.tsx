'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TableSectionComponent from './TableSectionComponent';
import { orders } from '@/constants/orders';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

function TableComponent() {
  const [searchText, setSearchText] = useState('');

  type OrderStatus = 'paid' | 'unpaid' | 'return' | 'completed' | 'failed';

 

    const searchResults = orders.filter(order => {
      return (
        order.id == searchText ||
        order.customerName.toLowerCase().includes(searchText.toLowerCase())
      );
    });

   const filterProducts = (status: OrderStatus) => {
    return searchResults.filter(order => order.status === status);
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(filterProducts("completed"))
    }
  };

  return (
    <div className="p-4">
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center w-full gap-2 flex-col lg:flex-row">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
            <TabsTrigger value="return">Return</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          <div className="relative w-full flex justify-end  lg:w-3/12">
            <Input
              value={searchText}
              onKeyDown={handleKeyDown}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Search"
              className="pr-7 w-3/5 md:w-3/4"
            />
            <Search className="size-5 absolute top-1/2  right-2 text-gray-300 dark:text-zinc-700 -translate-y-1/2 " />
          </div>
        </div>
        

        <TabsContent value="all">
          <TableSectionComponent orders={searchResults} />
        </TabsContent>
          

        <TabsContent value="paid">
          <TableSectionComponent orders={filterProducts('paid')} />
        </TabsContent>

        <TabsContent value="unpaid">
          <TableSectionComponent orders={filterProducts('unpaid')} />
        </TabsContent>

        <TabsContent value="return">
          <TableSectionComponent orders={filterProducts('return')} />
        </TabsContent>

        <TabsContent value="completed">
          <TableSectionComponent orders={filterProducts('completed')} />
        </TabsContent>

        <TabsContent value="failed">
          <TableSectionComponent orders={filterProducts('failed')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TableComponent;
