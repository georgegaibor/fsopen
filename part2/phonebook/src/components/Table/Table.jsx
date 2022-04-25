import './table.css';
import phoneService from '../../services/phoneService';

const Table = ({displayArray, setPeople}) => {
  
  const handleDelete = (id) => {
    const person = displayArray.find(person => person.id === id)
    if(window.confirm(`Delete ${person.name}?`)){
      phoneService
      .remove(id)
      .then( () => {
        setPeople(displayArray.filter(dude => dude.id !== person.id))
      })
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th colSpan="1">Name</th>
          <th colSpan="1">Number</th>
        </tr>
      </thead>
      <tbody>
        {
          displayArray.map( person => 
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td>
                <button onClick={()=>handleDelete(person.id)}>
                  Delete
                </button>
              </td>
            </tr>  
          )
        }
      </tbody>
    </table>
  )
}

export default Table