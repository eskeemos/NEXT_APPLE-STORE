import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MagnifyingGlassIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../redux/basketSlice'

function Header() {
  const items = useSelector(selectBasketItems);
  const session = false;
  return (
    <header className='sticky h-16 top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] shadow-sm p-4'>
      <div className='flex items-center justify-center md:w-1/5'>
        <Link href="/">
          <Image src='https://rb.gy\vsvv2o' width={25} height={10} alt='apple-logo' className='cursor-pointer opacity-75 hover:opacity-100 w-auto  transition-opacity' />
        </Link>
      </div>
      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a className="headerLink">Product</a>
        <a className="headerLink">Explore</a>
        <a className="headerLink">Support</a>
        <a className="headerLink">Business</a>
      </div>
      <div className='flex items-center justify-center gap-x-4 md:w-1/5'>
        <MagnifyingGlassIcon className="headerIcon" />
        <Link href="/checkout">
          <div className='relative cursor-pointer'>
            <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-[11px] text-white">{items.length}</span>
            <ShoppingBagIcon className='headerIcon' />
          </div>
        </Link>
        {session ? (
          <Image src={
            // session.user?.image || 
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} alt="avatars" className='cursor-pointer rounded-full' width={34} height={34}
          // onClick={() => signOut()} 
          />
        ) : (<UserIcon className='headerIcon'
        // onClick={() => signIn() 
        />)}
      </div>
    </header>
  )
}

export default Header