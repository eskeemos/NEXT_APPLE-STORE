import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import CheckoutProduct from '../components/CheckoutProduct'
import Header from '../components/Header'
import { selectBasketItems, selectBasketTotal } from '../redux/basketSlice'
import Currency from 'react-currency-formatter';
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe'
import { fetchPostJSON } from '../utils/api-helpers'
import getStripe from "../utils/get-stripejs";

function Checkout() {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const router = useRouter();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results
    }, {} as { [key: string]: Product[] });

    setGroupedItemsInBasket(groupedItems);
  }, [items]);


  const createCheckoutSession = async () => {
    setLoading(true);

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_sessions",
      {
        items: items
      }
    );

    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    console.error(error.message);

    setLoading(false);
  }

  return (
    <div className='min-h-screen overflow-hidden bg-[#E7ECEE]'>
      <Head>
        <title>Bag - Apple</title>
      </Head>
      <Header />
      <main className='mx-auto max-w-5xl pb-24'>
        <div className='text-center'>
          <h1 className='my-4 text-3xl font-semibold lg:text:4xl'>{items.length > 0 ? "Review your bag." : "Your bag is empty."}</h1>
          <p className='my-4'>Free delivery and free returns</p>
          {items.length === 0 && (
            <Button
              title="Continue Shopping"
              onClick={() => router.push("/")}
            />
          )}
        </div>
        {items.length > 0 && (
          <div className='mx-5 md:mx-8'>
            {Object.entries(groupedItemsInBasket).map(([key, item]) => (
              <CheckoutProduct key={key} items={item} id={key} />
            ))}
            <div className='my-12 mt-6 mx-auto max-w-3xl p-2'>
              <div className='divide-y divide-gray-300'>
                <div className='pb-4'>
                  <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>
                      <Currency quantity={basketTotal} currency="USD" />
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex flex-col gap-x-1 lg:flex-row'>
                      Estimated tax for: {""}
                      <p className='flex cursor-pointer items-end text-indigo-500 hover:underline'>
                        Enter zip code <ChevronDownIcon className='h-6 w-6' />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>
                <div className='flex justify-between pt-4 text-xl font-semibold'>
                  <h4>Total</h4>
                  <h4>
                    <Currency quantity={basketTotal} currency="USD" />
                  </h4>
                </div>
              </div>
              <div className='my-14 space-y-4'>
                <h4 className='text-xl font-semibold'>
                  How would you like to check out?
                </h4>
                <div className='flex flex-col gap-4 md:flex-row'>
                  <div className='order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center'>
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      <span>Pay Monthly</span>
                      <span>With Apple Card</span>
                      <span>
                        $283.16/mo. at 0% APR<sup className='-TOP-1'>*</sup>
                      </span>
                    </h4>
                    <Button title='Check Out with Apple Card Monthly Instalments' style='w-full max-w-lg' />
                    <p className='mt-2 max-w-[240px] text-[13px]'>
                      $0:00 due today, which includes applicable full-price items, down payments, shipping and taxes.
                    </p>
                  </div>
                  <div className='flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2'>
                    <h4 className='mb-4 flex flex-col text-xl font-semibold text-center'>
                      Pay in full
                      <span>
                        <Currency quantity={basketTotal} currency="USD" />
                      </span>
                    </h4>
                    <Button
                      title='Check Out' style='w-full max-w-lg' onClick={createCheckoutSession}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Checkout