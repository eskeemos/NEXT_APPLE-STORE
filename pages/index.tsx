import { Tab } from '@headlessui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Landing from '../components/Landing'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Apple Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='relative h-[200vh] bg-[#E7ECEE]'>
        <Landing />
      </main>
      <section className='relative z-40 -mt-[93.25vh] min-h-screen bg-[#1B1B1B]'>
        <div className="space-y-10 py-16">
          <h1 className='text-center text-4xl font-medium tracking-wide text-white md:text-5xl'>New Promos</h1>

          <Tab.Group>
            <Tab.List className="flex justify-center">
              {/* {(categories).map((category) => (
                <Tab
                  key={category.id}
                  id={category.id}
                  className={({ selected }) =>
                      `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${selected
                      ? 'borderGradient bg-[#35383C] text-white' : 'border-b-2 border-[#35383C] text-[#747474]'}`
                  }
                >
                  iPhone
                </Tab>
              ))} */}
            </Tab.List>
            <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
              {/* {[0,1,2,3].map((index) => (
                <Tab.Panel className="tabPanel">{showProducts(index)}</Tab.Panel>
              ))} */}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  )
}

export default Home

// export const 
