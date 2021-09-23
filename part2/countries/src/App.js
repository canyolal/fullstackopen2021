import React,{useEffect,useState} from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFilter] = useState([]);

  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log('promise fulfilled')
        //console.log(response.data)
        setCountries(response.data)
      })

    
  },
  [],)

  const handleSearch = (event) => {
    let value = event.target.value
    let result = []
    result = countries.filter((data) => {
      return data.name.search(value) !== -1;
    })

    setFilter(result)
    console.log('result length', result.length)

    if (result.length === 1) {
      let showDetails = true
    }
  }

  return (
    <div>
      find countries: 
        <input type="text"
          onChange ={handleSearch}
        />
      {filtered.map((value,index)=>{
        return(
          <li key={value.id}>
            {value.name}
          </li>
        )
      })}
    </div>
  );
}

export default App;