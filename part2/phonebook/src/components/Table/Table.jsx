import './table.css'

const Table = ({displayArray}) => {
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
            </tr>  
          )
        }
      </tbody>
    </table>
  )
}

export default Table