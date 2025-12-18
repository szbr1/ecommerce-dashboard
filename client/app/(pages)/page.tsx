'use client';

import Link from 'next/link';
export default function Home() {
  return (
  <div className='p-5'>
    <Link className='underline' href="/dashboard">Dashboard</Link>
  </div>
  );
}
