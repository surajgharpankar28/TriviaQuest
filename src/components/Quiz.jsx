/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { data } from "../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0); // Tracks the current question index
  const [selectedOption, setSelectedOption] = useState(null); // Tracks the selected option
  const [points, setPoints] = useState(0); // Tracks the total points
  const question = data[index]; // Current question

  const checkAns = (ansIdx) => {
    if (selectedOption !== null) return; // Prevent re-answering the same question

    setSelectedOption(ansIdx);
    if (ansIdx === question.correctOption) {
      setPoints(points + question.points); // Add points for the correct answer
    }
  };

  const handleNext = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setSelectedOption(null); // Reset the selected option for the next question
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-2xl p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          React Quiz
        </h1>
        <hr className="border-gray-300 mb-6" />
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          {index + 1}. {question.question}
        </h2>
        <ul className="space-y-4 mb-6">
          {question.options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => checkAns(idx)}
              className={`p-4 text-gray-800 rounded-lg cursor-pointer transition 
                ${
                  selectedOption === idx
                    ? idx === question.correctOption
                      ? "bg-green-400 text-white"
                      : "bg-red-400 text-white"
                    : idx === question.correctOption && selectedOption !== null
                    ? "bg-green-400 text-white"
                    : "bg-gray-100 hover:bg-blue-100"
                }`}
            >
              {option}
            </li>
          ))}
        </ul>
        <button
          onClick={handleNext}
          disabled={selectedOption === null} // Disable the button until an option is selected
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition mb-4 disabled:bg-gray-400"
        >
          Next
        </button>
        <div className="text-gray-500 text-center">
          <span className="font-medium">{index + 1}</span> of{" "}
          <span className="font-medium">{data.length}</span> Questions
        </div>
        <div className="text-gray-700 text-center mt-4">
          <span className="font-medium">Score:</span> {points} points
        </div>
      </div>
    </div>
  );
};

export default Quiz;
