import React from 'react'
import { urlFor } from '../sanity';
import Image from 'next/image';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../redux/basketSlice';
import { toast } from 'react-hot-toast';

interface Props {
  product: Product
}

function Product({ product }: Props) {
  const dispatch = useDispatch();
  const { title, price } = product;
  const addItemToBasket = () => {
    dispatch(addToBasket(product));
    toast.success(`${product.title} added to basket`, {
      position: 'bottom-center',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }
  
  return (
    <div className="w-80 max-w-sm bg-[#353B3C] rounded-lg shadow-2xl relative">
      <div className='h-60 flex justify-center items-center'>
        <Image src={urlFor(product.image[0]).url()} className="h-52 w-auto" alt="product" height={200} width={200} />
      </div>
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center pb-2">{title}</h5>
        <div className="flex items-center justify-between mt-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>
          <Button title='Shop Now' onClick={addItemToBasket} />
        </div>
      </div>
    </div>
  )
}

export default Product // 3:10