# Trivia-Game

# 🎯 Project Objective

The objective of this project is to build a full-stack Trivia Game application that allows users to configure game settings, play interactive trivia questions, and receive a final score calculated by the backend.

# ✨ Features
- Customizable game setup
  - Number of questions
  - Question type (multiple choice or true/false)
  - Difficulty level
  - Category selection
- Interactive gameplay
  - Shuffled answer options to ensure fairness
  - Next and Previous navigation
  - Ability to change answers before submission
- Backend score calculation
  - Computes final score based on user answers
  - Determines win or loss based on scoring rules
  - Displays final score
  - Shows win/lose message returned from the backend to frontend

  ![Untitled design](https://github.com/user-attachments/assets/b331aa31-bba0-48c7-8534-784e7924f3af)

 
# 🧩 Technologies Used
- ✅ Frontend
  - React
  - JavaScript
  - Vitest
  - React Testing Library
- ✅ Backend
  - Node.js
  - Express
  - Jest
- ✅ API Testing
  - Thunder Client

# 🧪 How to Test
1. Clone the Repository
- `git clone https://github.com/sylviajsy/Trivia-Game-.git`
2. Set Up the Backend
- `cd server`
- `npm install`
- Start the backend server: `npm run dev`
  - The backend should run on: `http://localhost:8080`
- Start the backend tests: `npm test`
  - Note: Backend tests are unit tests and do not require starting the server.
3. Set Up the Frontend
- `cd client`
- `npm install`
- `npm run dev`
  - The frontend should run on: `http://localhost:5173`
- Start the frontend tests: `npm run test`

# 🌟 Nice-to-Have
1. Show Correct Answers for Incorrect Responses
  - After the game ends, display the correct answer for questions the user answered incorrectly. This would help users learn from their mistakes instead of only seeing a final score.
2. AI-Powered Answer Explanations
  - Integrate an AI service to generate short explanations for each question, especially when the user selects an incorrect answer. For example, the app could explain why a certain answer is correct, turning the trivia game into a lightweight learning tool.
3. Enhanced Results Review Screen
  - Add a detailed results page that allows users to review:
    - Their selected answer
    - The correct answer
    - An optional explanation
