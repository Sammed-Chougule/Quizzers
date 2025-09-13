"use client";
import { motion } from "motion/react";
import Link from 'next/link';
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";


export function HeroSectionOne() {
    return (
        <div>
            <BackgroundRippleEffect />
            <Navbar />
            <div
                className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                <div
                    className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </div>
            <div
                className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                <div
                    className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </div>
            <div
                className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
                <div
                    className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="px-4 py-10 md:py-20">
                <h1
                    className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
                    {["Master", "Any", "Topic", "in", "days,", "not", "months", "with", "Quizzers"].map((word, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.1,
                                ease: "easeInOut",
                            }}
                            className={`mr-2 inline-block${word === "Quizzers" ? " text-blue-500" : ""}`}>
                            {word}
                        </motion.span>
                    ))}
                </h1>
                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 0.8,
                    }}
                    className="relative z-10 mx-auto max-w-xl py-4 text-center text-xl md:text-2xl font-normal text-neutral-600 dark:text-neutral-400">
                    Quizzers generates adaptive, AI-curated quizzes , so you learn exactly what you need fast.

                </motion.p>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 1,
                    }}
                    className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Link href="/quizzes">
                        <button
                            className="w-60 transform rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                            Start a Free Quiz
                        </button>
                    </Link>
                    <Link href="/login">
                    <button
                        className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
                        Register
                    </button>
                    </Link>
                    <motion.p
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.3,
                            delay: 0.8,
                        }}
                        className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400">
                        Build rock-solid any skills at warp speed
                    </motion.p>

                    <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">

                        <video
                            src="/quizzers_demo.mp4"
                            alt="Landing page preview"
                            className="aspect-[16/9] h-auto w-full object-cover"
                            height={1000}
                            width={1000}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

const Navbar = () => {
    return (
        <div>

        </div>
        // <nav
        //     className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
        //     {/* <div className="flex items-center gap-2">

        //         <div />
        //         <img src="/quizzers_logo.png" alt="Logo" className="h-8 w-8 md:h-12 md:w-12" />
        //         <h1 className="text-base font-bold md:text-2xl">Quizzers</h1>
        //     </div> */}
        //     {/* <Link href="/login">
        //     <button
        //         className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        //         Login
        //     </button>
        //     </Link> */}

        // </nav>
    );
};
