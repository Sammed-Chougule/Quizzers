"use client";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { LoaderFive } from "./ui/loader";
import Quizzes from "./quizzes";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";

export function PlaceholdersAndVanishInputDemo() {
  const [quizType, setQuizType] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  const placeholders = [
    "Write Any topic for quiz",
    "Write Any Subject for quiz",
    "Write Anything for quiz",
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
      
      let cleanedData;
      if (data.response && typeof data.response === 'string') {
        cleanedData = data.response.replace(/```json\s*/, '').replace(/\s*```$/, '');
        try {
          const quizData = JSON.parse(cleanedData);   
          setApiResponse(JSON.stringify(quizData, null, 2));
        } catch (parseError) {
          console.log("Parse error:", parseError);
          setApiResponse("Error parsing JSON: " + parseError.message);
        }
      } else {
        setApiResponse(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      setApiResponse("Error fetching quiz: " + error.message);
    }

    setLoading(false);
  };

  return (
    !apiResponse ? (
      <div className="h-[40rem] flex flex-col justify-center items-center px-4">
        {!loading ? (
          <>
          <BackgroundRippleEffect />
            <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
              Ask <span className="text-blue-500 font-bold">Quizzers</span> for a Quiz
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
        )}
      </div>
    ) : (
      <div className="h-[40rem] flex flex-col justify-center items-center px-4">
        <Quizzes
          apiResponse={apiResponse}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
        <button
          onClick={() => {
            setApiResponse("");
            setQuizType("");
            setCurrentQuestion(0);
            setSelectedOptions({});
          }}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Generate Another Quiz
        </button>
      </div>
    )
  );
}