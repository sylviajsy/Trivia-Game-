import React, { useRef } from 'react'

const GameSetup = ({ onSubmit }) => {
    const noQuestion = useRef();
    const userType = useRef();
    const userDifficulty = useRef();
    const userCategory = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            question: noQuestion.current.value,
            type: userType.current.value,
            difficulty: userDifficulty.current.value,
            category: userCategory.current.value
        }

        onSubmit(formData);
    }

  return (
    <div>
        <h2>Game Settings</h2>
        <form onSubmit={handleSubmit}>
            <label>Number of questions</label>
            <input type="number" required placeholder="Number of questions" ref={noQuestion}/>

            <label>Type</label>

            <label>Difficulty</label>
            <label>Category</label>
            <button type="submit">Start Game</button>
        </form>
    </div>
  )
}

export default GameSetup
