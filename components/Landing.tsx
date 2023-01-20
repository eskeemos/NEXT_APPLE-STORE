import Image from 'next/image'
import React from 'react'
import Button from './Button'

function Landing() {
  return (
    <section className='sticky top-[64px] mx-auto flex h-screen max-w-[1350px] items-center justify-center px-8'>
      <div className='space-y-8'>
        <h1 className='space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl'>
          <span className='block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>Powered</span>
          <span className="block">By Intelllect</span>
          <span className="block">Driven By Values</span>
        </h1>
        <div className='space-x-8'>
          <Button title="Buy Now" />
          <a className="link">Learn More</a>
        </div>
      </div>
      <div className='relative hidden transition-all h-[450px] w-[450px] duration-500 md:inline lg:h-[650px] lg:w-[600px]'>
        <Image src="/iphone.png" alt='iphone' width={450} height={450} />
      </div>
    </section>
  )
}

export default Landing