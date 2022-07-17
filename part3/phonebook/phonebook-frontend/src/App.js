import { useState, useEffect } from 'react';
import phoneService from './services/phoneService';

import NewForm from './components/NewForm/NewForm';
import Table from './components/Table/Table';
import Filter from './components/Filter/Filter';
import Notification from './components/Notification/Notification';


const App = () => {
  
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [filterString, setFilterString] = useState('')
  const [message, setMessage] = useState('')


  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPhoneBook => {
        setPeople(initialPhoneBook)
      })
    
  }, [])
  
  const peopleToShow = people.filter(person => 
    person.name.toLowerCase().includes(filterString.toLowerCase())
  )
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
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
        setMessage={setMessage}
      />
      <h3>Numbers</h3>
      <Table displayArray={peopleToShow} setPeople={setPeople} setMessage={setMessage}/>
    </div>
  )
}

export default App
