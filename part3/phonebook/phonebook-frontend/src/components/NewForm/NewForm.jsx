import phoneService from "../../services/phoneService";


const NewForm = ({people,
                  setPeople,
                  newName,
                  setNewName,
                  newNumber,
                  setNumber,
                  setMessage}) => {

    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {
          name: newName,
          number: newNumber,
          id: people.length + 1
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
          .catch(result => {
            console.log(result.response.data)
            const errorMssg = result.response.data.error
            
            if(errorMssg.includes('shorter')){
              setMessage('Error: name or phone number are too short')
            }else if(errorMssg.includes('not a valid')){
              setMessage('Error: incorrect phone number format')
            }else{
              setMessage(errorMssg)
            }

            setTimeout(()=>{
              setMessage(null)
            }, 5000)
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
