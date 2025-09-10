import React, { useState } from "react";

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
        <h2 className="mb-10 sm:mb-20 text-xl  text-center sm:text-5xl dark:text-white text-black">
          Your quiz for the Topic
           <span className="font-bold text-blue-500"> {quizObj.quiz.topic}</span>
        </h2>
        <div className="bg-gray-50 border rounded-lg p-4 shadow mb-6">
          <div className="font-semibold mb-2">Q{currentQuestion + 1}. {q.question}</div>
          <div className="mb-2">
            {Object.entries(q.options).map(([key, value]) => {
              let optionClass = "";
              if (submitted) {
                if (key === q.correctAnswer) optionClass = "bg-green-100 font-bold text-green-700";
                else if (selectedOptions[q.id] === key) optionClass = "bg-red-100 font-bold text-red-700";
              }
              return (
                <label key={key} className={`block cursor-pointer mb-1 ${optionClass}`}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={key}
                    checked={selectedOptions[q.id] === key}
                    onChange={() => handleOptionChange(q.id, key)}
                    className="mr-2 accent-blue-500"
                    disabled={submitted}
                  />
                  <span className="font-mono">{key}.</span> {value}
                </label>
              );
            })}
          </div>
          {submitted && (
            <>
              <div className="text-sm text-gray-700 mb-1">Difficulty: <span className="font-semibold">{q.difficulty}</span></div>
              <div className="text-sm text-blue-700">Explanation: {q.explanation}</div>
            </>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">{currentQuestion + 1} / {totalQuestions}</span>
          <button
            onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions - 1))}
            disabled={currentQuestion === totalQuestions - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        {(!submitted && allAnswered) ? (
          <button
            onClick={() => setSubmitted(true)}
            className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Submit Quiz
          </button>
        ) : (!submitted && !allAnswered) ? (
          <button
            disabled
            title="Attempt all questions to submit"
            className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg opacity-50 cursor-not-allowed"
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

