/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StartScreen = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedNumQuestions, setSelectedNumQuestions] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setCategories(data.trivia_categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const startQuiz = () => {
    if (!selectedCategory || !selectedNumQuestions) {
      alert("Please select a category and number of questions!");
      return;
    }
    navigate("/quiz", {
      state: {
        category: { id: selectedCategory, name: selectedCategoryName },
        numQuestions: selectedNumQuestions,
        difficulty: selectedDifficulty.toLowerCase(),
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white">
      <div className="w-full max-w-md bg-white text-gray-800 rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome to the Quiz!
        </h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-center">
            Select a Category
          </h3>
          <select
            value={selectedCategory}
            onChange={(e) => {
              const selected = categories.find(
                (cat) => cat.id === parseInt(e.target.value)
              );
              setSelectedCategory(selected?.id || "");
              setSelectedCategoryName(selected?.name || "");
            }}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="" disabled>
              -- Choose a category --
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-center">
            Select Number of Questions
          </h3>
          <div className="flex gap-3 justify-center">
            {[5, 10, 15, 20, 25, 30].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedNumQuestions(num)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition ${
                  selectedNumQuestions === num
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-blue-100"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-center">
            Select Difficulty
          </h3>
          <div className="flex gap-3 justify-center">
            {["Easy", "Medium", "Hard"].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition ${
                  selectedDifficulty === difficulty
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-blue-100"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>
        <div className="text-center">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
            onClick={startQuiz}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
