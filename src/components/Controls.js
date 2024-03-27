import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { moveDown, moveLeft, moveRight, rotate } from '../features/gameSlice.js'

export default function Controls(props) {
  const dispatch = useDispatch()
  const isRunning = useSelector((state) => state.isRunning)
  const speed = useSelector((state) => state.speed)
  const gameOver = useSelector((state) => state.gameOver)

  const requestRef = useRef()
  const lastUpdateTimeRef = useRef(0)
  const progressTimeRef = useRef(0)

  useEffect(() => {

    // handle key press
    const keyDownHandler = (e) => {
      if (e.key === "ArrowLeft") {
        dispatch(moveLeft())
      } else if (e.key === "ArrowRight") {
        dispatch(moveRight())
      } else if (e.key === "ArrowDown") {
        dispatch(moveDown())
      } else if (e.key === " ") {
        dispatch(rotate())
      }
    }

    const update = (time) => {
      requestRef.current = requestAnimationFrame(update)
      if (!isRunning) {
        return
      }
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = time
      }
      const deltaTime = time - lastUpdateTimeRef.current
      progressTimeRef.current += deltaTime
      if (progressTimeRef.current > speed) {
        dispatch(moveDown())
        progressTimeRef.current = 0
      }
      lastUpdateTimeRef.current = time
    }

    requestRef.current = requestAnimationFrame(update)
    // Add event listener for keydown
    document.addEventListener('keydown', keyDownHandler)
    return () => {
      cancelAnimationFrame(requestRef.current)
      // Remove event listener when component unmounts
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [isRunning, dispatch, speed])




  return (
  <div className="controls">
    {/* left */}
    <button
      disabled={!isRunning || gameOver}
      className="control-button"
      onClick={(e) => {
        dispatch(moveLeft())
      }
    }>Left</button>

    {/* right */}
    <button
      disabled={!isRunning || gameOver}
      className="control-button"
      onClick={(e) => {
        dispatch(moveRight())
      }
    }>Right</button>

    {/* rotate */}
    <button
      disabled={!isRunning || gameOver}
      className="control-button"
      onClick={(e) => {
        dispatch(rotate())
      }
    }>Rotate</button>

    {/* down */}
    <button
      disabled={!isRunning || gameOver}
      className="control-button"
      onClick={(e) => {
        dispatch(moveDown())
      }
    }>Down</button>

  </div>
  )
}
