import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react'
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';
import { removeFromBasket } from '../redux/basketSlice';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

interface Props {
  items: Product[],
  id: string;
}

function CheckoutProduct({ id, items }: Props) {
  const dispatch = useDispatch();
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.error(`${items[0].title} removed from your basket`, {
      position: 'bottom-center',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }

  return (
    <div className='flex flex-row shadow-md lg:flex-row lg:items-center m-3 pr-9 xl:pb-0 rounded-xl p-2'>
      <div className='xl:border-r w-40 flex justify-center items-center'>
        <Image src={urlFor(items[0].image[0]).url()} alt="Product" width={100} height={100} className="w-auto h-28" />
      </div>
      <div className='flex flex-1 items-center'>
        <div className='flex-1'>
          <div className='flex flex-col items-start justify-center gap-x-2 text-xl  lg:text-2xl'>
            <h4 className='font-semibold'>{items[0].title}</h4>
            <p className='text-sm my-2'>Quantity : {items.length}</p>
            <p className='cursor-pointer flex items-end text-indigo-500 text-base'>
              Show product details
              <ChevronDownIcon className='h-6 w-6' />
            </p>
          </div>
        </div>
        <div className='flex flex-col items-end space-y-4'>
          <h4 className='text-xl font-semibold lg:text-2xl'>
            <Currency
              quantity={items.reduce((total, product) => total + product.price, 0)}
              currency="USD"
            />
          </h4>
          <button onClick={removeItemFromBasket} className="cursor-pointer text-indigo-500">Remove</button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutProduct // 4:30