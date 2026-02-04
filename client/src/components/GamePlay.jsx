import React from 'react'

const GamePlay = ({ question }) => {
    function decodeHtml(str) {
        const doc = new DOMParser().parseFromString(str, "text/html");
        return doc.documentElement.textContent;
        }

  return (
    <div>
      <ol>
        {question.map((q, i) => (
          <li key={i}>{decodeHtml(q.question)}</li>
        ))}
      </ol>
    </div>
  )
}

export default GamePlay
