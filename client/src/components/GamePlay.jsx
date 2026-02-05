import React from 'react'
import { useState } from 'react';

function decodeHtml(str) {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.documentElement.textContent;
}

const GamePlay = ({ question }) => {
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

    // const handleSubmit = () => {

    // }

  return (
    <div>
      <h3>
        {decodeHtml(currentQuestion.question)}
      </h3>
      {options.map((option,index)=>{
        return <button key={index}>
            {decodeHtml(option)}
        </button>
      })}
    </div>
  )
}

export default GamePlay
