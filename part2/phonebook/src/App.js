import React, { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import Filter from './components/Filter.js'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  // const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  },
  [],)

  return (
    <div>
      <h1>Phonebook</h1>
      {/* <Filter newFilter={newFilter} setNewFilter={setNewFilter} persons={persons}/> */}

      <h2>Add a new contact</h2>
      <PersonForm newName={newName} newNumber={newNumber} persons={persons} 
        setNewName={setNewName} setNewNumber={setNewNumber} setPersons={setPersons}/>


      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  )
}

export default App