'use client';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Image from 'next/image';

function Navbar() {
  return (
    <div className="flex sticky top-0 right-0 w-full border-b pb-3 dark:bg-[#0A0A0A] bg-white justify-between items-center px-12 mt-3 py-2">
      <div className='flex justify-center gap-3'>
            <SidebarTrigger />
       
      <Link href={'/dashboard'} className='text-xl cursor-pointer'>
        <span className="font-bold">Dash</span>
        <span className="text-amber-500">board</span>
      </Link>
      </div>

      <div>
        
        <DropdownMenu>
          <DropdownMenuTrigger className='cursor-pointer'>

            <div className='size-8 bg-green-300 rounded-full overflow-hidden'>
            <Image src={'/person.png'} height={10} width={10} alt='' className='size-full object-cover'/>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/dashboard/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Navbar;
