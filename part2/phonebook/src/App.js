import React, { useState } from 'react'
import Names from './components/Names.js'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' , 
      id:1}
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      id: persons.length +1
    }
    let checker = false
    for(let i=0; i<persons.length; i++){
      if (persons[i].name === newName){
        checker = true
      }
    }

    console.log('new name', newName)
    console.log('array check', checker)
    if(checker){
      setNewName('')
      console.log('it is in the list')
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
      console.log('it is not in the list')
      setPersons(persons.concat(nameObject))
      setNewName('')
    }

  }

  const handleNewName = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input 
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      {persons.map(person =>
        <Names key={person.id} persons={person}/> 
      )}
      
    </div>
  )
}

export default App