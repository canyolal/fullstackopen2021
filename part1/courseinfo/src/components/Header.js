import React from 'react'
import Content from './Content.js'
import SumParts from './SumParts.js'

const Header = ({courses}) => {
    return(
        <div>
            <h2>{courses.name}</h2>
            <Content parts={courses.parts} />
            <SumParts parts={courses.parts} />
        </div>
        


        
    )
}

export default Header