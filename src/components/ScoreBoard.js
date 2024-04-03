import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pause, resume, restart } from '../features/gameSlice.js'

export default function ScoreBoard() {
  const dispatch = useDispatch()
  const score = useSelector((state) => state.score)
  const gameOver = useSelector((state) => state.gameOver)
  const isRunning = useSelector((state) => state.isRunning)

  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.key === "p") {
        if (isRunning) {
          dispatch(pause())
        } else {
          dispatch(resume())
        }
      } else if (e.key === "r") {
        dispatch(restart())
      }
    }

    document.addEventListener('keydown', keyDownHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [score, gameOver, isRunning, dispatch])

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
