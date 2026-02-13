import React from 'react'

const GameResult = ({ finalScore,message }) => {
  return (
    <div className="gameEnd">
      
      <h1 className="gameEnd-title">Game End!</h1>

      <div className="gameEnd-score">
        {finalScore}
      </div>

      <div className="gameEnd-message">
        {message}
      </div>
    </div>
  )
}

export default GameResult
