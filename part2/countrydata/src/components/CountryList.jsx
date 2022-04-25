
const CountryList = ({countries, setFilterString}) => {
  
  const handleClick = (event)=>{
    setFilterString(event.target.value)
  }
  
  return (
    <ul>
      {countries.map(country=>{
        return <li key={country.name.common}>{country.name.common}
        <button onClick={handleClick} value={country.name.common}>Show</button>
        </li>
      })}
    </ul>
  )  
  
  
}

export default CountryList