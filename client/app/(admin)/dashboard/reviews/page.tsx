import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { reviews } from '@/constants/reviews';
import { GetDate } from '@/utils/StoreUtils';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

function Page() {
  return (
    <div className="flex justify-center flex-col gap-3 py-5 px-2 md:px-3 lg:px-4">
      {reviews.map(review => (
        <Card className="flex py-2 lg:py-4  justify-between flex-row">
          <CardHeader className="w-full">
            <div className="flex gap-3 items-center">
              <div className="size-8 md:size-10 lg:size-12 shrink-0 rounded-full overflow-hidden">
                <Image
                  src={review.user.imageUrl}
                  height={10}
                  width={10}
                  alt=""
                  className="size-full object-cover rounded-full"
                />
              </div>
              <div className='w-full max-w-3/6 overflow-hidden  '>
                <CardTitle>{review.user.name}</CardTitle>
                <CardDescription className="py-2 text-xs w-full whitespace-nowrap truncate">
                  {review.text}
                </CardDescription>
                <div className="flex items-center gap-2">
                  {Array.from({ length: review.starRating }).map((_, index) => (
                    <FaStar key={index} size={12} className="text-amber-500" />
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="w-full flex justify-center items-end gap-1 flex-col">
            <div className="text-xs md:text-sm opacity-50">
              {GetDate(review.createdAt)}
            </div>
            <Link className="opacity-50 text-xs md:text-sm " href={''}>
              #348932
            </Link>
            {/* TODO  */}
            <Button className='cursor-pointer' variant={'outline'}>
              <Trash className='text-red-700' />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Page;
