import { useState, useRef, useEffect } from "react"
import Die from "../components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const buttonRef = useRef(null)
    const gameWon = dice.every(diceElement => diceElement.value == dice[0].value && diceElement.isHeld)

    gameWon && console.log("Game won!")

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
        setDice(oldDice => oldDice.map( die => 
                    die.id === id ? 
                    {...die, isHeld: !die.isHeld} : die
            )
        )
    }
   
    const diceElements = dice.map(dieObject => <Die key={dieObject.id} value = {dieObject.value} isHeld ={dieObject.isHeld} handleClick={() => toggleIsHeld(dieObject.id)} />)

    function rollDice() {
        if (gameWon){
            setDice(generateAllNewDice())
        } else {
        setDice(dice => dice.map(singeDice => {
            return singeDice.isHeld ? singeDice : { 
                        ...singeDice,
                        value: Math.ceil(Math.random() * 6)
                    }
                }
            ))
        }
    }

    useEffect(() => {if (gameWon){
        if (!gameWon) return
        buttonRef.current.focus()
    }},[gameWon]);

    return (
        <main>
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again. </p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" ref={buttonRef} onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
}