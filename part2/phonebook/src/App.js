import React, { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import Filter from './components/Filter.js'
import personService from './services/personService.js'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  },
  [],)

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter persons={persons}/>

      <h2>Add a new contact</h2>
      <PersonForm newName={newName} newNumber={newNumber} persons={persons} 
        setNewName={setNewName} setNewNumber={setNewNumber} setPersons={setPersons}/>

      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App