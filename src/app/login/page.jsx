"use client";
import { CardDemo } from '@/components/loginForm';
import Link from 'next/link';
import React from 'react';

const Page = () => {
    return (
        <div className='flex justify-center items-center h-screen '>
            <h1 className='text-center text-2xl font-bold'>Will come soon till now enjoy <br/> <Link href="/"> <span className='text-blue-500 text-4xl'>Quizzers</span></Link>...</h1>
           {/* <CardDemo /> */}
        </div>
    )
}

export default Page;