
const NewForm = ({people,
                  setPeople,
                  newName,
                  setNewName,
                  newNumber,
                  setNumber}) => {

    const isEqual = (personA, personB) => {
        const keys1 = Object.keys(personA);
        const keys2 = Object.keys(personB);
    
        if(keys1.length !== keys2.length){
          return false;
        }
    
        for(let key of keys1) {
          if(personA[key]!==personB[key]){
            return false;
          }
          return true;
        }
    }

    const addPerson = (event) => {
        event.preventDefault();
    
        const personObject = {
          name: newName,
          number: newNumber,
          id: people.length + 1
        }
    
        if(people.some((person)=> isEqual(person, personObject))){
          window.alert(`${newName} already exists`)
          return 
        }
        setPeople([...people, personObject])
        setNewName('')
        setNumber('')
    }
    
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    
    const handleNumberChange = (event) => {
        setNumber(event.target.value)
    }

  
    return (
      <form onSubmit={addPerson}>
        <div>
          Name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          Number:
          <input 
            value={newNumber}
            onChange={handleNumberChange} 
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

export default NewForm