import phoneService from "../../services/phoneService";


const NewForm = ({people,
                  setPeople,
                  newName,
                  setNewName,
                  newNumber,
                  setNumber,
                  setMessage}) => {

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

    const updateNumber = (id) => {
      const person = people.find(dude => dude.id === id)
      const upadtedPerson = {...person, number: newNumber}

      phoneService
        .update(id, upadtedPerson)
        .then(returnedPerson => {
          setPeople(people.map( dude => dude.id !== id ? dude : returnedPerson))
        })
    }
    
    const addPerson = (event) => {
        event.preventDefault();
    
        const personObject = {
          name: newName,
          number: newNumber,
          id: people.length + 1
        }
    
        if(people.some((person)=> isEqual(person, personObject))){
          const searchPerson = people.filter(person => isEqual(person, personObject) && person )
          if(window.confirm(`${searchPerson[0].name} already exists. Update number?`)){
            updateNumber(searchPerson[0].id)   
          }
          return
        }

        phoneService
          .create(personObject)
          .then(returnedPerson => {
            setPeople([...people, returnedPerson])
            setMessage(`Added ${returnedPerson.name}`)
            setTimeout(()=>{
              setMessage(null)
            }, 5000)
            setNewName('')
            setNumber('')
          })
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