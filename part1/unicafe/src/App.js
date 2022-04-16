import { useState } from 'react'
import Button from './components/Button'
import Stats from './components/Stats'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedBack = (set, objective) => () =>{
    set(objective+1)
  }

  const names = ["Good", "Neutral", "Bad"]
  const counts = [good, neutral, bad]
  
  return (
    <>
      <h1>Feedback</h1>
      <Button onClick={feedBack(setGood,good)} name="Good"/>
      <Button onClick={feedBack(setNeutral,neutral)} name="Neutral"/>
      <Button onClick={feedBack(setBad,bad)} name="Bad"/>
      
      <h1>Stats</h1>
      <Stats names={names} counts={counts}/>
    </>
  )
}

export default App
