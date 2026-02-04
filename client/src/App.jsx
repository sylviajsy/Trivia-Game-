import { useState,useEffect } from 'react'
import './App.css'
import GameSetup from './components/GameSetup';

function App() {
  // const [count, setCount] = useState(0);
  const [question, setQuestion] = useState([]);
  const [error, setError] = useState(null);

  const loadData = async(formData) => {
    try {
      const response = await fetch(`http://localhost:8080/questions`);
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

  useEffect(()=>{
      loadData()
    },[])

  return (
    <>
      <GameSetup onSubmit={loadData}/>
    </>
  )
}

export default App
