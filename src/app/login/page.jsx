"use client";
import { CardDemo } from '@/components/loginForm';
import { AuroraBackground } from '@/components/ui/aurora-background';
import Link from 'next/link';
import React from 'react';

const Page = () => {
    return (
        <div className='flex justify-center items-center h-screen '>
            <AuroraBackground className='absolute inset-0'>
                <h1 className='text-center text-2xl font-bold'>I'll be back soon, but for now, enjoy <br/> <span className='text-blue-500 text-4xl'>Quizzers ....</span></h1>
            </AuroraBackground>
           {/* <CardDemo /> */}
        </div>
    )
}

export default Page;