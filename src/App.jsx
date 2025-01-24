import { Routes, Route } from "react-router-dom";
import StartScreen from "./components/StartScreen";
import Quiz from "./components/Quiz"; // Your quiz component
import ResultPage from "./components/ResultPage"; // Your quiz component
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<StartScreen numQuestions={10} />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
