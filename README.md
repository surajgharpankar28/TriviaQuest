
# TriviaQuest

Welcome to the **TriviaQuest**! This is a fun and interactive trivia quiz application where users can answer multiple questions and test their knowledge on various topics. You can choose the category, the number of questions, choose a difficulty level, and at the end of the quiz, see your score. The questions are fetched from the **Open Trivia Database API**.

## Live Demo

You can try the live demo of the app by visiting the link below:

[**Live Demo**](https://trivia-quest-ssg.vercel.app/)

## Features

- **Question Source**: The questions are fetched from the [Open Trivia Database API](https://opentdb.com/api_config.php).
- **Customizable Settings**: 
  - Choose category 
  - Set the number of questions.
  - Choose a difficulty level: easy, medium, or hard.
- **Dynamic App Theme**: The app's theme dynamically changes based on the selected difficulty:
  - **Easy**: Green theme for a relaxing experience.
  - **Medium**: Orange theme for a balanced experience.
  - **Hard**: Red theme for a challenging experience.
- **Timer**: Answer each question within a specified time frame (30 seconds).
- **Result Screen**: View your final score and see how many questions you answered correctly.

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/surajgharpankar28/TriviaQuest.git
   ```
   
2. Navigate to the project directory:
   ```bash
   cd quiz
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to view the app.

## Technologies Used

- **React**: Frontend framework for building interactive UI.
- **React Router**: For routing between different pages.
- **Tailwind CSS**: For styling the application.
- **Open Trivia Database API**: For fetching trivia questions.
  
## App Flow

1. **Start Screen**: The user selects the number of questions, difficulty level, and starts the quiz.
2. **Quiz**: The user answers a series of multiple-choice questions. The questions are dynamically fetched from the Open Trivia Database API based on the selected category and difficulty.
3. **Result Screen**: After completing the quiz, the user sees their final score along with the total number of questions.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make changes, and submit a pull request. Contributions are always welcome!

## Contact

Feel free to reach out and connect with me on my social profiles:

- [GitHub](https://github.com/SurajGharpankar28)
- [LinkedIn](https://www.linkedin.com/in/surajgharpankar/)
- [Twitter](https://x.com/surajgharpankar)
---

Thank you for checking out this quiz app. Enjoy the quiz and test your knowledge!
