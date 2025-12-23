'use client';
import { useGetStoreQuery } from '@/(config)/api/storeApi';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Pen } from 'lucide-react';
import { useRef } from 'react';
import StoreProfile from '../_components/storeProfile';

function Page() {
  const { data, isLoading, isError } = useGetStoreQuery({});

  const fileInput = useRef<HTMLInputElement | null>(null);

  const store = data && data.result;

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error</div>;
  }

  console.log(data);
  return (
    <div className=" p-2 md:p-3.5 lg:p-5 flex flex-col gap-6">
      {/* STORE POSTER  */}
      <div className="w-full h-30 md:h-40 lg:h-50 rounded-3xl overflow-hidden relative ">
        <img
          src={'/poster.png'}
          height={10}
          width={10}
          alt=""
          className="size-full object-cover"
        />
        <Button
          className={cn('size-10 p-1 cursor-pointer absolute bottom-2 right-3')}
          onClick={() => {
            fileInput.current?.click();
          }}
        >
          <Pen size={25} className="bg-amber-500 p-1 rounded-full text-black" />
        </Button>
      </div>

       
      <StoreProfile store={store} />

      {/* BRAND SHOOT POSTER  */}
      <div className="w-full h-55 md:h-63 lg:h-87 rounded-md overflow-hidden relative ">
        <img
          src={'/brandshoot.png'}
          height={10}
          width={10}
          alt=""
          className="size-full"
          style={{
            objectFit: 'cover',
            objectPosition: '70% 23%',
          }}
        />
        <Button
          className={cn('size-10 p-1 cursor-pointer absolute bottom-2 right-3')}
          onClick={() => {
            fileInput.current?.click();
          }}
        >
          <Pen size={25} className="bg-amber-500 p-1 rounded-full text-black" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-5  w-full">
        <div className="h-60 md:h-73 lg:h-87.5 w-full relative rounded-lg overflow-hidden ">
          <img
            src={'/mainproduct.png'}
            height={10}
            width={10}
            alt=""
            className="size-full object-cover"
          />

          <Button
            className={cn(
              'size-10 p-1 cursor-pointer absolute bottom-2 right-3'
            )}
            onClick={() => {
              
              fileInput.current?.click();
            }}
          >
            <Pen
              size={25}
              className="bg-amber-500 p-1 rounded-full text-black"
            />
          </Button>
        </div>
        <div className=" h-60 md:h-73 lg:h-87.5 w-full relative rounded-lg overflow-hidden ">
          <img
            src={'/mainproduct2.png'}
            height={10}
            width={10}
            alt=""
            className="size-full object-cover"
          />
          <Button
            className={cn(
              'size-10 p-1 cursor-pointer absolute bottom-2 right-3'
            )}
            onClick={() => {
              fileInput.current?.click();
            }}
          >
            <Pen
              size={25}
              className="bg-amber-500 p-1 rounded-full text-black"
            />
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-3 p-5 bg-zinc-900 rounded-md mx-3">
        <Button className="cursor-pointer" variant={'outline'}>
          Cancel
        </Button>
        <Button className="w-40 py-4 cursor-pointer">Save</Button>
      </div>
    </div>
  );
}

export default Page;
