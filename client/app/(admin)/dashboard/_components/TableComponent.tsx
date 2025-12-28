'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TableSectionComponent from './TableSectionComponent';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { DeliveryStatus, OrdersInterface} from '@/utils/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function TableComponent({orders, rm}: {orders: OrdersInterface[], rm?:boolean}) {
  const [searchText, setSearchText] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<OrdersInterface[]>(orders);


   if(!orders) return <div>Nothing</div>
 

    const searchResults = filteredOrders.filter(order => {
      return (
        order.id == searchText ||
        order.user.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });

   const filterProducts = (status: DeliveryStatus) => {
    return searchResults.filter(order => order.deliveryStatus === status );
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(filterProducts(DeliveryStatus.DELIVERED))
    }
  };

  const handleDateChange = (value: string)=>{
    let fromDays = 0;
    console.log("run 1")

    if(value === "1")  fromDays = 30;
    if(value === "3") fromDays = 90;
    if(value === "6") fromDays = 184;
    if(value === "12")  fromDays = 365
    
    const today = new Date();
    const from = new Date(today);
    from.setDate(today.getDate() - fromDays);

    const result = orders.filter(order => !(from > new Date(order.createdAt)) )
    setFilteredOrders(result)
    
  }

  return (
    <div className="p-4">
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center w-full gap-2 flex-col lg:flex-row">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            {!rm && 
            <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
            }
            <TabsTrigger value="return">Return</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          <div className="relative w-full gap-3 flex justify-end  lg:w-4/12">
            <Select defaultValue='default' onValueChange={item => handleDateChange(item)}>
              <SelectTrigger className='w-25 md:w-35'>
                 <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='1'>1 Month</SelectItem>
                  <SelectItem value='3'>3 Month</SelectItem>
                  <SelectItem value='6'>6 Month</SelectItem>
                  <SelectItem value='12'>12 Month</SelectItem>
                  <SelectItem value='default'>Default</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              value={searchText}
              onKeyDown={handleKeyDown}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Search"
              className="pr-7 w-full md:w-3/4"
            />
            <Search className="size-5 absolute top-1/2  right-2 text-gray-300 dark:text-zinc-700 -translate-y-1/2 " />
          </div>
        </div>
        

        <TabsContent value="all">
          <TableSectionComponent orders={orders} />
        </TabsContent>
          
          <TabsContent value="pending">
          <TableSectionComponent orders={filterProducts(DeliveryStatus.PENDING)} />
        </TabsContent>

        <TabsContent value="completed">
          <TableSectionComponent orders={filterProducts(DeliveryStatus.SHIPPED)} />
        </TabsContent>

        <TabsContent value="delivered">
          <TableSectionComponent orders={filterProducts(DeliveryStatus.DELIVERED)} />
        </TabsContent>

        <TabsContent value="return">
          <TableSectionComponent orders={filterProducts(DeliveryStatus.RETURN)} />
        </TabsContent>

        <TabsContent value="failed">
          <TableSectionComponent orders={filterProducts(DeliveryStatus.FAILED)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TableComponent;
