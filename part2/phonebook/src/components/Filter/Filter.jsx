
const Filter = ({filterString, 
              setFilterString}) => {
  
  const handleFilterString = (event)=>{
    setFilterString(event.target.value)
  }
  
  return (
    <div>
      Filter:
      <input 
        value={filterString} 
        onChange={handleFilterString}
      />
    </div>
  )
}

export default Filter