import React from 'react'

const GamePlay = ({ question }) => {
  return (
    <div>
      <ol>
        {question.map((q, i) => (
          <li key={i}>{q.question}</li>
        ))}
      </ol>
    </div>
  )
}

export default GamePlay
