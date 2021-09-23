import React from 'react'
 
const PersonForm = ({newName,newNumber,persons,setNewName,setNewNumber,setPersons}) =>{

    const addContact = (event) => {
        event.preventDefault()
    
        const nameObject = {
          name: newName,
          id: persons.length +1,
          number: newNumber,
        }
    
        let nameChecker = false //control whether name in the list or not
        let numberChecker = false //control whether number in the list or not
    
        for(let i=0; i<persons.length; i++){
            if (persons[i].name === newName){
                nameChecker = true
            }
        }
    
        console.log('new name', newName)
        console.log('array check', nameChecker)
        if(nameChecker){
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

    const handleNewNumber = (event) =>{
        console.log(event.target.value)
        setNewNumber(event.target.value)
    
    }
    
    const handleNewName = (event) =>{
        console.log(event.target.value)
        setNewName(event.target.value)
    
    }

    return(
        <form onSubmit={addContact}>
            <div>
            name:
                <input 
                    type="text"
                    value={newName}
                    onChange={handleNewName}
                />
            </div>
            <div>
            number: 
                <input 
                    type ="text"
                    value={newNumber}
                    onChange={handleNewNumber}  
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
         </form>
    )
    
}


export default PersonForm