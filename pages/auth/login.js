import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { login_validate } from '../../lib/validate';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import {signIn} from 'next-auth/react';
const login = () => {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const formik = useFormik({
    initialValues:{
      email:'',
      password:'',
      confirmPassword:''
    },
    validate:login_validate,
    onSubmit
  })

  async function onSubmit(values){

    const redirectUrl = router.query.redirect || '/';
    const status = await signIn('credentials',{
      redirect:false,
      email:values.email,
      password:values.password,
      confirmPassword:values.confirmPassword,
      callbackUrl:redirectUrl
    })

    if(!status.ok){
      if(status.error === "Email or Password dosen't match"){
        toast.error(status.error)
      }
    }

    if(status.ok) router.push(status.url)
  }

  const handleGoogleLogin = async () => {
    const redirectUrl = router.query.redirect || '/';
    signIn('google', { callbackUrl: redirectUrl });
  }
  return (
    <Layout>
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                        CHERRY   
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={formik.handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" id="email" {...formik.getFieldProps('email')} className={`${formik.errors.email && formik.touched.email ? 'input-error' : 'input-primary'}bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="name@company.com" required=""/>
                                    {formik.errors.email && formik.touched.email ? <span className='text-[10px] text-error'>{formik.errors.email}</span> : <></>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" {...formik.getFieldProps('password')} placeholder="••••••••" className={`${formik.errors.password && formik.touched.password ? 'input-error' : 'input-primary'}bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} required=""/>
                                    {formik.errors.password && formik.touched.password ? <span className='text-[10px] text-error'>{formik.errors.password}</span> : <></>}
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" {...formik.getFieldProps('confirmPassword')}  className={`${formik.errors.confirmPassword && formik.touched.confirmPassword ? 'input-error' : 'input-primary'}bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} required=""/>
                                    {formik.errors.confirmPassword && formik.touched.confirmPassword ? <span className='text-[10px] text-error'>{formik.errors.confirmPassword}</span> : <></>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                                </div>
                                <button type="submit" disabled={loading ? true : false} className="w-full text-white bg-pink-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link href="/auth/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </Layout>
  )
}

export default login

