import { useState,useEffect } from 'react'
import './App.css'
import GameSetup from './components/GameSetup';
import GamePlay from './components/GamePlay';

function App() {
  // const [count, setCount] = useState(0);
  const [question, setQuestion] = useState([]);
  const [error, setError] = useState(null);
  const [finalScore, setFinalScore] = useState(0);


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

  const handleGameEnd = (finalAnswers) => {
    let score = 0;
    question.foreach((item,index) => {
      if(finalAnswers[index] == q.correct_answer){
        score ++;
      }
    })
    setFinalScore(score);
  }

  return (
    <>
      <h1>Trivia Game</h1>
      {question.length === 0 ? (
        <GameSetup onSubmit={loadData}/>
      ):(
        <GamePlay question={question} gameEnd={handleGameEnd}/>
      )}
    </>
  )
}

export default App
