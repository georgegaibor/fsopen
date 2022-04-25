import {useState, useEffect} from 'react';
import Filter from './components/Filter';
import CountryList from './components/CountryList';
import SingleCountry from './components/SingleCountry';
import axios from 'axios';


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterString, setFilterString] = useState('')
  const [capital, setCapital] = useState('Helsinki')
  const [cityData, setCityData] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response=>{
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response=>{
        setCityData(response.data)
      })
  }, [capital])


  const countryToShow = countries.filter(country=>{
    const name = country.name.common.toLowerCase()
    return name.includes(filterString.toLowerCase())
  })
  
  
  if(countryToShow.length<20 && countryToShow.length>1){
    return(
      <div>
        <h1>Country Finder</h1>
        <Filter 
        filterString={filterString}
        setFilterString={setFilterString}
        />
        <CountryList countries={countryToShow} setFilterString={setFilterString}/>
      </div>
    )
  }else if(countryToShow.length===1){
    return (
      <div>
        <h1>Country Finder</h1>
        <Filter 
          filterString={filterString}
          setFilterString={setFilterString}
        />
        <SingleCountry country={countryToShow} setCapital={setCapital} cityData={cityData}/>
      </div>
    )
  }else{
    return(
      <div>
        <h1>Country Finder</h1>
        <Filter 
        filterString={filterString}
        setFilterString={setFilterString}
        />
        <p>Please refine your search</p>
      </div>
    )
  }
  
}

export default App
