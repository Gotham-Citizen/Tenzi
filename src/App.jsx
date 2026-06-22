import { useState, useRef, useEffect } from "react"
import Die from "../components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const [rollCount, setRollCount] = useState(0)
    const [timer, setTimer] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [bestRollCount, setBestRollCount] = useState(() => {
        const saved = localStorage.getItem("bestRollCount")
        return saved ? JSON.parse(saved) : Infinity
    })
    const [bestTime, setBestTime] = useState(() => {
        const saved = localStorage.getItem("bestTime")
        return saved ? JSON.parse(saved) : Infinity
    })
    
    const buttonRef = useRef(null)
    const gameWon = dice.every(diceElement => diceElement.value == dice[0].value && diceElement.isHeld)

    useEffect(() => {
        let intervalId
        if (isTimerRunning && !gameWon) {
            intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1)
            }, 1000)
        }
        return () => clearInterval(intervalId)
    }, [isTimerRunning, gameWon])

    useEffect(() => {
        if (gameWon) {
            setIsTimerRunning(false)
            buttonRef.current?.focus()
            
            // Update best records
            if (rollCount < bestRollCount) {
                setBestRollCount(rollCount)
                localStorage.setItem("bestRollCount", JSON.stringify(rollCount))
            }
            if (timer < bestTime) {
                setBestTime(timer)
                localStorage.setItem("bestTime", JSON.stringify(timer))
            }
        }
    }, [gameWon, rollCount, timer, bestRollCount, bestTime])

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({ 
                id: nanoid(),
                value: Math.ceil(Math.random() * 6), 
                isHeld: false
            }))
    }

    function toggleIsHeld(id) {
        setDice(oldDice => oldDice.map(die => 
            die.id === id ? 
            {...die, isHeld: !die.isHeld} : die
        ))
    }
   
    const diceElements = dice.map(dieObject => 
        <Die 
            key={dieObject.id} 
            value={dieObject.value} 
            isHeld={dieObject.isHeld} 
            handleClick={() => toggleIsHeld(dieObject.id)} 
        />
    )

    function rollDice() {
        if (gameWon) {
            setDice(generateAllNewDice())
            setRollCount(0)
            setTimer(0)
            setIsTimerRunning(true)
        } else {
            if (!isTimerRunning) {
                setIsTimerRunning(true)
            }
            setRollCount(prevCount => prevCount + 1)
            setDice(dice => dice.map(singeDice => {
                return singeDice.isHeld ? singeDice : { 
                    ...singeDice,
                    value: Math.ceil(Math.random() * 6)
                }
            }))
        }
    }

    function formatTime(seconds) {
        if (seconds === Infinity) return "--"
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
    }

    return (
        <main>
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again. </p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            
            {/* Stats Display */}
            <div className="stats-container">
                <div className="stat-item">
                    <span className="stat-label">Rolls:</span>
                    <span className="stat-value">{rollCount}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Time:</span>
                    <span className="stat-value">{formatTime(timer)}</span>
                </div>
                {gameWon && (
                    <>
                        <div className="stat-item best">
                            <span className="stat-label">🏆 Best Rolls:</span>
                            <span className="stat-value">{bestRollCount === Infinity ? "--" : bestRollCount}</span>
                            <span className="stat-label">🏆 Best Time:</span>
                            <span className="stat-value">{formatTime(bestTime)}</span>
                        </div>
                    </>
                )}
            </div>

            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" ref={buttonRef} onClick={rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}