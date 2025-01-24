import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { points, totalQuestions } = location.state;

  const getPerformanceMessage = () => {
    const percentage = (points / totalQuestions) * 100;
    if (percentage === 100) return "Outstanding! You aced it! 🏆";
    if (percentage >= 80) return "Great job! 🎉 You're almost there!";
    if (percentage >= 50) return "Good effort! Keep practicing! 💪";
    return "Don't give up! Try again! 🚀";
  };

  const handleRetakeQuiz = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-4/5 max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Quiz Results
        </h1>
        <hr className="border-gray-300 mb-4" />
        <div className="text-center">
          <p className="text-2xl font-semibold text-blue-600">
            {points} / {totalQuestions}
          </p>
          <p className="text-gray-600 mt-2">Your Final Score</p>
        </div>
        <div className="text-center mt-6">
          <p className="text-xl font-medium text-gray-700">
            {getPerformanceMessage()}
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleRetakeQuiz}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
