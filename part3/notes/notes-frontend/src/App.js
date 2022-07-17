import { useState, useEffect } from 'react';

import Note from './components/Note';
import Button from './components/Button';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/noteService';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    noteService
      .create(noteObject)
      .then(returnedNote=>{
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event)=>{
    setNewNote(event.target.value)
  }

  const toggleImportanceOf= (id) => {
    const note = notes.find(note=> note.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote=>{
        setNotes(notes.map(note => note.id !== id ? note: returnedNote))
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(`The note '${note.content}' was already deleted`)
        setTimeout(()=>{
          setErrorMessage('')
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important)

  
  return (
    <div className="App">
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <Button 
          onClick = {()=>setShowAll(!showAll)}
          name={showAll ? "Show important":" Show all"}
        />
      </div>
      <ul>
        {notesToShow.map( note => 
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={()=>toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>Save</button>
      </form>
      <Footer/>
    </div>
  );
}

export default App;
