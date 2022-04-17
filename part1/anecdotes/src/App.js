import anecdotes from "./anecdoteData";
import {useState} from "react";
import Button from "./components/Button";

function App() {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))


  const handleVote = () => {
    const upvote = [...vote]
    upvote[selected] +=1
    setVote(upvote)
  }

  const updateIndex = () => {
    const randomized = Math.floor(Math.random()*anecdotes.length)
    setSelected(randomized)
  }

  return (
    <div className="App">
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      <br />
      {vote[selected]}
      <Button name="Vote" onClick={handleVote}/>
      <Button name="New Anecdote" onClick={updateIndex}/>
      <h1>Most voted</h1>
      {anecdotes[vote.indexOf(Math.max(...vote))]}
    </div>
  );
}

export default App;
