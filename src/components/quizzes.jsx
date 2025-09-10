import React, { useState } from "react";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";

export default function Quizzes({ apiResponse, selectedOptions, setSelectedOptions, currentQuestion, setCurrentQuestion }) {
  const [submitted, setSubmitted] = useState(false);
  try {
    const quizObj = JSON.parse(apiResponse);
    const questions = quizObj.quiz.questions;
    const totalQuestions = questions.length;
    const q = questions[currentQuestion];
    const allAnswered = questions.every(q => selectedOptions[q.id]);

    const handleOptionChange = (qid, key) => {
      if (!submitted) {
        setSelectedOptions({ ...selectedOptions, [qid]: key });
      }
    };

    return (
      <>
        <BackgroundRippleEffect />
        <h2 className="mb-6 text-xl md:text-3xl font-bold text-center">
          Your quiz for the Topic
          <span className="block font-bold text-blue-500 text-lg md:text-3xl mt-1">{quizObj.quiz.topic}</span>
        </h2>
        <div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 border border-blue-300 rounded-xl p-4 shadow mb-4 w-full max-w-xl mx-auto">
          <div className="font-semibold mb-2 text-base text-blue-900">Q{currentQuestion + 1}. {q.question}</div>
          <div className="mb-2">
            {Object.entries(q.options).map(([key, value]) => {
              let optionClass = "";
              if (submitted) {
                if (key === q.correctAnswer) optionClass = "bg-green-100 font-bold text-green-700 border-green-400";
                else if (selectedOptions[q.id] === key) optionClass = "bg-red-100 font-bold text-red-700 border-red-400";
              }
              return (
                <label key={key} className={`block cursor-pointer mb-1 rounded border px-2 py-1 transition-all duration-200 shadow-sm hover:bg-blue-50 text-sm ${optionClass}`}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={key}
                    checked={selectedOptions[q.id] === key}
                    onChange={() => handleOptionChange(q.id, key)}
                    className="mr-2 accent-blue-500 scale-110"
                    disabled={submitted}
                  />
                  <span className="font-mono font-bold">{key}.</span> <span>{value}</span>
                </label>
              );
            })}
          </div>
          {submitted && (
            <>
              <div className="text-xs text-gray-700 mb-1">Difficulty: <span className="font-semibold">{q.difficulty}</span></div>
              <div className="text-xs text-blue-700">Explanation: {q.explanation}</div>
            </>
          )}
        </div>
        <div className="flex justify-between items-center mt-4 w-full max-w-xl mx-auto">
          <button
            onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
            disabled={currentQuestion === 0}
            className="px-4 py-1 rounded bg-gray-200 text-gray-700 font-medium shadow hover:bg-gray-300 transition-all disabled:opacity-50 text-sm"
          >
            Previous
          </button>
          <span className="text-base font-semibold text-blue-700">{currentQuestion + 1} / {totalQuestions}</span>
          <button
            onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions - 1))}
            disabled={currentQuestion === totalQuestions - 1}
            className="px-4 py-1 rounded bg-blue-500 text-white font-medium shadow hover:bg-blue-700 transition-all disabled:opacity-50 text-sm"
          >
            Next
          </button>
        </div>
        {(!submitted && allAnswered) ? (
          <button
            onClick={() => setSubmitted(true)}
            title="Submit your answers to see results"
            className="mt-6 px-6 py-2 rounded-lg bg-green-500 text-white font-bold shadow hover:bg-green-600 transition-all text-base"
          >
            Submit Quiz
          </button>
        ) : (!submitted && !allAnswered) ? (
          <button
            disabled
            title="Attempt all questions to submit"
            className="mt-6 px-6 py-2 rounded-lg bg-green-500 text-white font-bold shadow opacity-50 cursor-not-allowed text-base"
          >
            Submit Quiz
          </button>
        ) : null}
      </>
    );
  } catch {
    return <pre>{apiResponse}</pre>;
  }
}

