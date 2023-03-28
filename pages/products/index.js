import Image from 'next/image'
import React from 'react'
import Layout from '@/components/Layout';
const Products = () => {
  return (
    <Layout>
        <div>
            <div className='bg-stone-300 h-56 w-[90%] mx-auto flex justify-around'>
                <div>
                    <h1 className='font-bold text-3xl mt-10 mb-5 w-[70%]'>Our product is more than just a product; it's an investment in your future happiness.</h1>
                    <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Buy Now</button>
                </div>
                <Image className='h-40 w-40 mt-10'></Image>
            </div>
            <div>
                <button className='categories'></button>
            </div>
            <h2 className='oneproductcategory'></h2>
            <div>
                <div>
                    <Image></Image>
                    <h2 className='product name'></h2>
                    <p className='price'></p>
                    <h3 className='product category'></h3>
                    <div className='reviews'></div>
                    <button>Add Cart</button>
                </div>
            </div>

        </div>
    </Layout>
  )
}

export default Products