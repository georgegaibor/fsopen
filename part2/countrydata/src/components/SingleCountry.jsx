import { useEffect } from "react"

const SingleCountry = ({country, setCapital, cityData}) => {
  
  useEffect(() => {
    setCapital(country[0].capital)  
  }, [])
  
  return (
    <div>
      <h2>{country[0].name.common}</h2>
      <p>Capital: {country[0].capital}</p>
      <p>Area: {country[0].area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country[0].languages).map(([key, value])=>{
          return <li key={key}>{value}</li>
        })}
      </ul>
      <img src={country[0].flags.png} alt={`${country[0].name.common}'s flag`} />
      <h3>Weather in {`${country[0].capital}`}</h3>
      <p>Temperature: {cityData.main.temp} °C</p>
      <p>Wind: {cityData.wind.speed} m/s</p>
    </div>
  )
}

export default SingleCountry