"use client";
import { CardDemo } from '@/components/loginForm';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import React from 'react';

const Page = () => {
    return (
        <div className='flex justify-center items-baseline mt-20 h-screen '>
            <BackgroundRippleEffect />
            <CardDemo />
            
        </div>
    )
}

export default Page;