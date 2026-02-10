import { useState,useEffect } from 'react'
import './App.css'
import GameSetup from './components/GameSetup';
import GamePlay from './components/GamePlay';
import GameResult from './components/GameResult';

function App() {
  // const [count, setCount] = useState(0);
  const [question, setQuestion] = useState([]);
  const [error, setError] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [message, setMessage] = useState("");
  // const [finalScore, setFinalScore] = useState(null);

  const loadData = async(formData) => {
    // This line converts the formData object into a string format that can be used in a URL
    const queryString = new URLSearchParams(formData).toString();
    try {
      const response = await fetch(`/api/questions?${queryString}`);
      const data = await response.json();
      console.log(data);

      if (data.response_code == "0"){
        console.log("Data Received:", data.results);
        setQuestion(data.results);
      } else {
        setError(data.message);
      }
    } catch(error){
      console.error(error);
    }
  } 

  // Send result to backend for score and win/lose
  const handleGameEnd = async(finalAnswers) => {
    try {
      const response = await fetch(`/api/results`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questions: question,
                userAnswers: finalAnswers
            }),}
        )

      const data = await response.json();
      console.log("backend result", data);
      
      setFinalScore(data.score);
      setMessage(data.message);
    } catch(error){
      console.error(error);
    }
  }

  return (
    <>
      <h1>Trivia Game</h1>
      {finalScore != null ? (
        <GameResult finalScore={finalScore} message={message}/>
      ) : question.length === 0 ? (
        <GameSetup onSubmit={loadData}/>
      ):(
        <GamePlay question={question} gameEnd={handleGameEnd}/>
      )} 
    </>
  )
}

export default App
