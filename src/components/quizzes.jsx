import React, { useState } from "react";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

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

    const words = [
    {
      text: "Quiz for the topic :-",
    },
    {
      text:    ` ${quizObj.quiz.topic}`,
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

    return (
      <div className="relative w-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h2 className="text-xl font-bold text-center">
            <TypewriterEffectSmooth words={words} />
          </h2>
          <div className=" w-full flex space-x-1 h-8 items-center px-4">
            {
              Array.from({ length: totalQuestions }, (_, i) => {
              let buttonClass = "relative w-full h-2 rounded-full transition-all duration-200 hover:h-4 ";
              
              if (selectedOptions[i+1]) {
                if (submitted) {
                  buttonClass += selectedOptions[i+1] === questions[i].correctAnswer 
                    ? "bg-green-500" 
                    : "bg-red-500";
                } else {
                  buttonClass += "bg-green-500";
                }
              } else {
                buttonClass += "bg-gray-200";
              }
              return (
                <div key={i+1} className="flex-1 h-8 flex items-center">
                  <button
                    onClick={() => setCurrentQuestion(i)}
                    className={buttonClass}
                  />
                </div>
              );
            })}
          </div>
          
          <div>
          </div>
          <div className=" bg-gradient-to-br from-blue-100 via-white to-blue-200 border border-blue-300 rounded-xl p-4 shadow mb-4 w-full max-w-xl mx-auto">
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
          {submitted && (
            <div className="my-2 text-xl font-bold text-green-700 bg-green-100 rounded-lg px-4 py-2 shadow">
              Score: {questions.filter(q => selectedOptions[q.id] === q.correctAnswer).length} / {totalQuestions}
            </div>
          )}
          {(!submitted && allAnswered) ? (
            <button
              onClick={() => setSubmitted(true)}
              title="Submit your answers to see results"
              className="mt-6 px-6 py-2 rounded-lg bg-green-500 text-white font-bold shadow hover:bg-green-600 transition-all text-base"
            >
              Submit Quiz
            </button>
          ) : (!submitted && !allAnswered) ? (
            <div className="relative group mt-6">
              <button
                disabled
                className="px-6 py-2 rounded-lg bg-green-500 text-white font-bold shadow opacity-50 cursor-not-allowed text-base"
              >
                Submit Quiz
              </button>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Attempt all questions to submit
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 transform -mt-1"></div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  } catch {
    return <pre>{apiResponse}</pre>;
  }
}

