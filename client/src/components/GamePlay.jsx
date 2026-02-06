import { setOptions } from 'leaflet';
import React from 'react'
import { useState } from 'react';

function decodeHtml(str) {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.documentElement.textContent;
}

function shuffle(a){
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
  return a
}

const GamePlay = ({ question, gameEnd }) => {
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState({});

    const currentQuestion = question[index];

    let options = [];
    if (currentQuestion.type == 'boolean'){
        options = ["True", "False"];
    } else {
        // incorrect answers are in [], needs to spread 
        options = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
    }

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
      {options.map((option,index)=>{
        return <button key={index} onClick={() => handleSelection(option)}>
            {decodeHtml(option)}
        </button>
      })}
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}

export default GamePlay
