import React from 'react'

const GameResult = ({ finalScore,message }) => {
  return (
    <div>
      <h1>Game End!</h1>
      {finalScore}
      {message}
    </div>
  )
}

export default GameResult
