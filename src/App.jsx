import { Routes, Route } from "react-router-dom";
import StartScreen from "./components/StartScreen";
import Quiz from "./components/Quiz"; // Your quiz component

function App() {
  return (
    <Routes>
      {/* Define routes */}

      <Route path="/" element={<StartScreen numQuestions={10} />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}

export default App;
