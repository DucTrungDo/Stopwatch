import React, { useState, useEffect } from 'react'

import './App.css'

const App: React.FC = () => {
  const [time, setTime] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)

  const [laps, setLaps] = useState<
    {
      lapNumber: number
      lapTime: number
      lapTotal: number
    }[]
  >([])
  const [lapTime, setLapTime] = useState<number>(0)
  const [lapNumber, setLapNumber] = useState<number>(0)
  const [showLap, setShowLap] = useState<boolean>(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
        setLapTime((preLapTime) => preLapTime + 10)
      }, 10)
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isActive])

  const startOrStopWatch = () => {
    setIsActive(!isActive)
  }

  const lapWatch = () => {
    if (isActive) {
      setShowLap(true)
      setLaps((prevLaps) => [
        ...prevLaps,
        { lapNumber: lapNumber + 1, lapTime: lapTime, lapTotal: time },
      ])
      setLapNumber((prevLapNumber) => prevLapNumber + 1)
      setLapTime(0)
    }
  }

  const resetWatch = () => {
    setTime(0)
    setIsActive(false)
    setShowLap(false)
    setLaps([])
    setLapTime(0)
    setLapNumber(0)
  }

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const miliseconds = Math.floor(((time % 60000) % 1000) / 10)

    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}:${miliseconds < 10 ? '0' : ''}${miliseconds}`
  }
  return (
    <div className='text-center'>
      <div className='text-6xl my-4'>{formatTime(time)}</div>
      <div>
        <button
          className='bg-gray-500 px-4 py-2 text-white mx-4 rounded-md'
          onClick={startOrStopWatch}
        >
          {isActive ? 'Stop' : 'Start'}
        </button>
        <button
          className='bg-gray-500 px-4 py-2 text-white mx-4 rounded-md'
          onClick={lapWatch}
        >
          Lap
        </button>
        <button
          className='bg-gray-500 px-4 py-2 text-white mx-4 rounded-md'
          onClick={resetWatch}
        >
          Reset
        </button>
      </div>

      <div>
        <div className='flex justify-center'>
          {showLap && (
            <table className='w-80'>
              <thead>
                <tr>
                  <th className='w-1/3'>Lap</th>
                  <th className='w-1/3'>Time</th>
                  <th className='w-1/3'>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{lapNumber + 1}</td>
                  <td>{formatTime(lapTime)}</td>
                  <td>{formatTime(time)}</td>
                </tr>
                {laps
                  .slice()
                  .reverse()
                  .map(({ lapNumber, lapTime, lapTotal }) => (
                    <tr key={lapNumber}>
                      <td>{lapNumber}</td>
                      <td>{formatTime(lapTime)}</td>
                      <td>{formatTime(lapTotal)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
