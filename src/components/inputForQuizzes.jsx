"use client";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

export function PlaceholdersAndVanishInputDemo() {
  const [quizType, setQuizType] = useState(true);
  const placeholders = [
    "Create a Medium level React Quiz",
    "Create a Hard level quiz on JavaScript",
    "Create an easy level quiz for Next.js",
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setQuizType(false);
  };
  return (
    quizType ? (
      <div className="h-[40rem] flex flex-col justify-center items-center px-4">
        <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
          Ask Quizzers for a Quiz
        </h2>
        <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
      </div>
    ) : (
      <div className="h-[40rem] flex flex-col justify-center items-center px-4">
        <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
          Your quiz is being generated...
        </h2>
      </div>
    )
  );
}
