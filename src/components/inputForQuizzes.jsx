"use client";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { LoaderFive } from "./ui/loader";

export function PlaceholdersAndVanishInputDemo() {
  const [quizType, setQuizType] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

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
      console.log("Raw API response:", data);

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
        )}
      </div>
    ) : (
      <div className="h-[40rem] flex flex-col justify-center items-center px-4">
        <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
          {(() => {
            try {
              const quizObj = JSON.parse(apiResponse);
              return `Your quiz is ready for the : ${quizObj.quiz.topic}`;
            } catch {
              return "Your quiz is ready!";
            }
          })()}
        </h2>
        <div className="mt-4 p-4 bg-white rounded text-left w-full max-w-4xl overflow-auto">
          {(() => {
            try {
              const quizObj = JSON.parse(apiResponse);
              const questions = quizObj.quiz.questions;
              const totalQuestions = questions.length;
              const q = questions[currentQuestion];
              return (
                <>
                  <div className="bg-gray-50 border rounded-lg p-4 shadow mb-6">
                    <div className="font-semibold mb-2">Q{currentQuestion + 1}. {q.question}</div>
                    <div className="mb-2">
                      {Object.entries(q.options).map(([key, value]) => (
                        <label key={key} className="block cursor-pointer mb-1">
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={key}
                            checked={selectedOptions[q.id] === key}
                            onChange={() => setSelectedOptions({ ...selectedOptions, [q.id]: key })}
                            className="mr-2 accent-blue-500"
                          />
                          {value}
                        </label>
                      ))}
                    </div>
                    <div className="text-sm text-blue-700">Explanation: {q.explanation}</div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
                      disabled={currentQuestion === 0}
                      className="px-4 py-2 bg-blue-500 text-whit rounded-lg disabled:opacity-50"
                    >
                      {`<<`}
                    </button>
                    <span className="text-lg font-semibold">{currentQuestion + 1} / {totalQuestions}</span>
                    <button
                      onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions - 1))}
                      disabled={currentQuestion === totalQuestions - 1}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                      {`>>`}
                    </button>
                    <button
                      onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions - 1))}
                      hidden={!(currentQuestion === totalQuestions - 1)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                      Submit
                    </button>

                  </div>
                </>
              );
            } catch {
              return <pre>{apiResponse}</pre>;
            }
          })()}
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