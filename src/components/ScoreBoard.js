import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pause, resume, restart } from '../features/gameSlice'

export default function ScoreBoard() {
  const dispatch = useDispatch()
  const score = useSelector((state) => state.score)
  const gameOver = useSelector((state) => state.gameOver)
  const isRunning = useSelector((state) => state.isRunning)

  return (
    <div className="score-board">
      <div className="score-text">Score: {score}</div>
      <div className="score-text">Level: 1</div>
      <button
        className="score-board-button"
        onClick={(e) => {
          if (gameOver) { return }
          if (isRunning) {
            dispatch(pause())
          } else {
            dispatch(resume())
          }
        }}
      >{isRunning ? 'Pause' : 'Play'}</button>
      <button className="score-board-button" onClick={(e) => {
        dispatch(restart())
      }}>Restart</button>
    </div>
  )
}
