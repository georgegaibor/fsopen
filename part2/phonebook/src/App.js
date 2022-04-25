import { useState, useEffect } from 'react';
import NewForm from './components/NewForm/NewForm';
import Table from './components/Table/Table';
import Filter from './components/Filter/Filter';
import axios from 'axios';


const App = () => {
  
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [filterString, setFilterString] = useState('')
  
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPeople(response.data)
      })
    
  }, [])
  
  const peopleToShow = people.filter(person => 
    person.name.toLowerCase().includes(filterString.toLowerCase())
  )
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filterString={filterString}
        setFilterString={setFilterString}
      />
      <h3>Add New</h3>
      <NewForm
        people={people}
        setPeople={setPeople}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNumber={setNumber}
      />
      <h3>Numbers</h3>
      <Table displayArray={peopleToShow}/>
    </div>
  )
}

export default App