import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
    return (
        <nav className=" w-full z-50 bg-white border-gray-200 dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
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

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li><a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a></li>
                        <li><a href="/quizzes" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Quizzes</a></li>
                        {/* <li><a href="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Services</a></li> */}
                        <Link href="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Login</Link>

                    </ul>
                </div>
            </div>
        </nav>
    );
};