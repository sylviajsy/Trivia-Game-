import { setOptions } from 'leaflet';
import React from 'react'
import { useState, useMemo } from 'react';

function decodeHtml(str) {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.documentElement.textContent;
}
// iterates from the end of the array toward the beginning,
// swapping each element with a randomly selected element
// that comes before it (or itself)
function shuffle(a){
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
  return a
}

function shuffleNTimes(arr, times = 3) {
  for (let i = 0; i < times; i++) {
    shuffle(arr);
  }
  return arr;
}

const GamePlay = ({ question, gameEnd }) => {
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState({});

    const currentQuestion = question[index];

    // Only shuffle when question changes, so when selecting, choices doesn't change
    const options = useMemo(() => {
        if (currentQuestion.type == 'boolean'){
        return ["True", "False"];
    } else {
        // incorrect answers are in [], needs to spread 
        const option = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
         return shuffleNTimes(option);
    }
    }, [currentQuestion]);
    

    const handleSelection = (option) => {
        setSelected(prev => ({
            ...prev,
            [index]: option
        }))
    }

    const handleNext = () => {
        if (index < question.length - 1){
            setIndex(prev => prev + 1);
        } else {
            gameEnd(selected);
        }
        console.log(selected);
    }

    const handlePrev = () => {
        if (index >= 1){
            setIndex(prev => prev - 1);
        }
    }

  return (
    <div>
      <h3>
        {decodeHtml(currentQuestion.question)}
      </h3>
      {options.map((option)=>{
        return <button key={option} onClick={() => handleSelection(option)}>
            {decodeHtml(option)}
        </button>
      })}
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}

export default GamePlay
