/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StartScreen = ({ numQuestions }) => {
  const navigate = useNavigate(); // Hook should be called at the top level
  const [categories, setCategories] = useState([]); // State to hold fetched categories
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track selected category

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCategories(data.trivia_categories); // Set categories in state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update selected category
  };

  const startQuiz = () => {
    if (!selectedCategory) {
      alert("Please select a category before starting the quiz!");
      return;
    }
    navigate("/quiz", { state: { category: selectedCategory } }); // Pass selected category as state
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome to The Quiz!
      </h2>
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-lg font-medium text-sm ${
              selectedCategory?.id === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-blue-100"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        onClick={startQuiz}
      >
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
