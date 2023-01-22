import { Tab } from '@headlessui/react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Landing from '../components/Landing'
import Product from '../components/Product'
import { fetchCategories } from '../utils/fetchCategories';
import { fetchProducts } from '../utils/fetchProducts'

type Props = {
  categories: Category[];
  products: Product[];
}

const Home = ({ categories, products }: Props) => {
  console.log(products);
  
  const showProducts = (category: number) => {
    return products.filter((product) => 
      product.category?._ref === categories[category]._id)
      .map((product) => <Product product={product} key={product._id} />)
  }

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
              {(categories).map((category) => (
                <Tab
                  key={category._id}
                  id={category._id}
                  className={({ selected }) =>
                    `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base transition-colors ${selected
                      ? 'bg-[#35383C] text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:100%_2px] bg-no-repeat bg-bottom'
                      : 'border-b-2 border-[#35383C] text-[#747474]'}`
                  }
                >
                  {category.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
              {[0,1,2,3].map((index) => (
                <Tab.Panel className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">{showProducts(index)}</Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const categories = await fetchCategories();
  const products = await fetchProducts();

  return {
    props: {
      categories, products
    }
  }
}
