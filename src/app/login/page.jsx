"use client";
import { CardDemo } from '@/components/loginForm';
import { AuroraBackground } from '@/components/ui/aurora-background';
import Link from 'next/link';
import React from 'react';

const Page = () => {
    return (
        <div className='flex justify-center items-baseline mt-20 h-screen '>
                {/* <h1 className='text-center text-2xl font-bold'>I'll be back soon, but for now, enjoy <br/> <span className='text-blue-500 text-4xl'>Quizzers ....</span></h1> */}
            <CardDemo className='z-50 bg-white' />
            
        </div>
    )
}

export default Page;