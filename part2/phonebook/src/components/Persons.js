import React from 'react'
import Names from './Names.js'


const Persons = ({persons}) => {

    return(
        <div>
            {persons.map(person =>
                <Names key={person.name} persons={person}/> 
            )}
        </div>

    )
}

export default Persons