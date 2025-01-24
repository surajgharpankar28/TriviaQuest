import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Function to decode HTML entities
const decodeHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent;
};

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, numQuestions, difficulty } = location.state;
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [points, setPoints] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30); // Timer for 30 seconds

  const shuffleOptions = (options) => options.sort(() => Math.random() - 0.5);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${numQuestions}&category=${category.id}&difficulty=${difficulty}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const formattedQuestions = data.results.map((q) => ({
        ...q,
        options: shuffleOptions([q.correct_answer, ...q.incorrect_answers]),
      }));
      setQuestions(formattedQuestions);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [category, numQuestions]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(30);
  }, [index]);

  const checkAns = (option) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    if (option === questions[index].correct_answer) {
      setPoints(points + 1);
    }
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setSelectedOption(null);
    } else {
      alert(`Quiz Completed! Your final score is ${points}.`);
      navigate("/results", {
        state: { points, totalQuestions: questions.length },
      });
    }
  };

  const handleQuit = () => {
    navigate("/"); // Redirect to home page
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        No questions available. Please try again.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="w-2xl p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Quiz: {category.name}
        </h1>
        <hr className="border-gray-300 mb-6" />

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-gray-700">
            {index + 1}. {decodeHtml(questions[index].question)}
          </h2>
        </div>
        <div className="text-md font-semibold text-red-600">
          Time Left: {timeLeft}s
        </div>
        <ul className="space-y-4 mt-4 mb-6">
          {questions[index].options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => checkAns(option)}
              className={`p-4 text-gray-800 rounded-lg cursor-pointer transition 
                ${
                  selectedOption === option
                    ? option === questions[index].correct_answer
                      ? "bg-green-400 text-white"
                      : "bg-red-400 text-white"
                    : selectedOption !== null &&
                      option === questions[index].correct_answer
                    ? "bg-green-400 text-white"
                    : "bg-gray-100 hover:bg-blue-100"
                }`}
            >
              {decodeHtml(option)} {/* Decode HTML entities */}
            </li>
          ))}
        </ul>
        <div className="flex justify-between">
          <button
            onClick={handleQuit}
            className="w-1/2 mr-2 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition"
          >
            Quit
          </button>
          <button
            onClick={handleNext}
            disabled={selectedOption === null && timeLeft > 0}
            className="w-1/2 ml-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-6 mb-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{
              width: `${((index + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
        <div className="text-center text-gray-500 text-sm font-medium">
          Question {index + 1} of {questions.length}
        </div>
        <div className="text-gray-700 text-center mt-4">
          <span className="font-medium">Score:</span> {points} points
        </div>
      </div>
    </div>
  );
};

export default Quiz;
