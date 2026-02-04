import { useState,useEffect } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0);
  const [question, setQuestion] = useState([]);
  const [error, setError] = useState(null);

  const loadData = async() => {
    try {
      const response = await fetch(`http://localhost:8080/questions`);
      const data = await response.json();
      console.log(data);

      if (data.response_code == "0"){
        console.log("Data Received:", data);
        setQuestion(data);
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
      
    </>
  )
}

export default App
