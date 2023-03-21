import React from 'react'
import Head from 'next/head'
import Header from './Header';
import Footer from './Footer';

const Layout = ({title,children}) => {
  return (
    <div>
        <Head>
            <title>{title ? title +'- CHERRY':'CHERRY'}</title>
            <meta name="description" content="Ecommerce Website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header/>
        <div>{children}</div>
        <Footer/>
    </div>
  )
}

export default Layout