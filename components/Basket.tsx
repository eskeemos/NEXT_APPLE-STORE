import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../redux/basketSlice';

function Basket() {
  const items = useSelector(selectBasketItems);

  if (items.length === 0) return <div></div>;

  return (
    <Link href="/checkout">
      <button className="rounded-full p-3 group bg-indigo-500 fixed bottom-10 right-10 z-50 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-indigo-400 transition-all ease-out duration-300">
        <span className="absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
            {items.length}
          </span>
        <span className="relative">
          <ShoppingBagIcon className='h-8 w-8' />
        </span>
      </button>
    </Link>
  )
}

export default Basket