import Layout from '@/components/Layout';
import { useSession } from "next-auth/react"
import { useEffect } from 'react';
import { useRouter } from 'next/router';


import { getServerSession } from "next-auth/next"
import { authOptions } from '../pages/api/auth/[...nextauth]'

export default function Home() {
  /*const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if(status !==  "authenticated"){
      router.push('/auth/login')
    }
  },[session])*/

  return (
    <Layout>
      <div className=''>
        <div className='w-[50%] text-right bg-red-500'>
          hello
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }
  
  return {
    props: {}
  }
}
