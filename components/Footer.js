import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <div>
        <footer className=" bg-gray-400 text-white dark:bg-gray-800">
            <div className="w-full mx-auto container md:p-6 p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-white sm:text-center dark:text-gray-400">© 2023 <Link href="https://flowbite.com/" className="hover:underline">CHERRY™</Link>. All Rights Reserved.</span>
                <ul className="flex flex-wrap items-center mt-3 text-sm text-white dark:text-gray-400 sm:mt-0">
                    <li>
                        <Link href="/about" className="mr-4 hover:underline md:mr-6 ">About</Link>
                    </li>
                    <li>
                        <Link href="/privacypolicy" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href="/terms" className="mr-4 hover:underline md:mr-6">Terms of Services</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:underline">Contact</Link>
                    </li>
                </ul>
            </div>
        </footer>
    </div>
  )
}

export default Footer