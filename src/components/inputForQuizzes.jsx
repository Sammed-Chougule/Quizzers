"use client";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { LoaderFive } from "./ui/loader";

export function PlaceholdersAndVanishInputDemo() {
  const [quizType, setQuizType] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const placeholders = [
    "Write Any type for quiz",
    "Write Any type for quiz",
    "Write Any type for quiz",
  ];

  const handleChange = (e) => {
    setQuizType(e.target.value);
  };

  const createQuizPrompt = (topic) => {
    return `You are an expert quiz generator. Create exactly 10 multiple-choice questions about "${topic}".

REQUIREMENTS:
- Generate exactly 10 questions of varying difficulty
- Each question must have exactly 4 options (A, B, C, D)
- Only one correct answer per question
- Questions should be educational and cover different aspects of the topic

CRITICAL: Return ONLY valid JSON with NO additional text, explanations, or formatting.

JSON FORMAT REQUIRED:
{
  "quiz": {
    "topic": "${topic}",
    "questions": [
      {
        "id": 1,
        "question": "Question text here?",
        "options": {
          "A": "First option",
          "B": "Second option",
          "C": "Third option",
          "D": "Fourth option"
        },
        "correctAnswer": "A",
        "explanation": "Brief explanation why this is correct",
        "difficulty": "easy"
      }
    ]
  }
}

VALIDATION:
✓ Exactly 10 questions
✓ 4 options per question (A, B, C, D)
✓ correctAnswer matches option key
✓ Valid JSON syntax
✓ No extra text

Generate quiz for: "${topic}"`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const quizPrompt = createQuizPrompt(quizType);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: quizPrompt }),
      });

      const data = await response.json();

      try {
        const quizData = JSON.parse(data.response);
        setApiResponse(JSON.stringify(quizData, null, 2));
      } catch (parseError) {
        setApiResponse(data.response || JSON.stringify(data, null, 2));
      }

    } catch (error) {
      setApiResponse("Error fetching quiz: " + error.message);
    }

    setLoading(false);
  };

  return (
    !apiResponse ? (
      <div className="h-[40rem] flex flex-col justify-center items-center px-4">
        { !loading ? (
          <>
            <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
              Ask Quizzers for a Quiz
            </h2>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
              disabled={loading}
            />
          </>
        ) : (
          <LoaderFive text="Generating Quiz..." />
        ) }
      </div>
    ) : (
      <div className="h-[40rem] flex flex-col justify-center items-center px-4">
        <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
          Your quiz is ready!
        </h2>
        <div className="mt-4 p-4 bg-white rounded text-left w-full max-w-4xl overflow-auto">
          {apiResponse}
        </div>
        <button
          onClick={() => {
            setApiResponse("");
            setQuizType("");
          }}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Generate Another Quiz
        </button>
      </div>
    )
  );
}