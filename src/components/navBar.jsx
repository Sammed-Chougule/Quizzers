
"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const pathname = usePathname();
    return (
        <nav className=" w-full z-50 hover:border-gray-200 dark:bg-gray-900 rounded-lg ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3">
                    <div className="relative h-8 w-8">
                        <Image
                            src="/favicon.ico"
                            alt="Quizzers Logo"
                            fill
                            sizes="32x32"
                            priority
                            className="object-contain"
                        />
                    </div>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Quizzers</span>
                </Link>

                <div className="hidden md:block w-full md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
                       {pathname === "/" &&
                        <Link href="/login">
                        <button className="px-6 py-2 rounded-md border border-blue-500 bg-blue-500 text-white text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                            Login
                        </button>
                        </Link>
                       } 

                    </ul>
                </div>
            </div>
        </nav>
    );
};