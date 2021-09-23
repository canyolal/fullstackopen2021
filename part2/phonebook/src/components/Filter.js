import React,{useState} from 'react'

const Filter =  ({persons}) => {
    const [filtered, setFilter] = useState(persons);
    const [showFilter, setShowFilter] = useState(false)
    
    const handleSearch = (event) => {
        event.preventDefault()
        let value = event.target.value
        value = value.toLowerCase()
        
        let result = []
        result = persons.filter((data) => {
          if (value != ""){
            return data.name.toLowerCase().search(value) !== -1;
          }
          
        })
        setFilter(result)
        console.log('result length', result.length)

    
      }    
    
    return (
        <div>
          Filter shown with: 
            <input type="text"
              onChange ={handleSearch}
            />
          {filtered.map((value,index)=>{
            return(
              <li key={value.id}>
                {value.name} - {value.number}
              </li>
            )
          })}
        </div>
      );

}

export default Filter