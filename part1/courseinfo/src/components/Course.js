import React from 'react'
import Header from './Header.js'
import Content from './Content.js'
import SumParts from './SumParts.js'


const Course = ({course}) => {
    return(
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <SumParts parts={course.parts} />
        </div>
      
    )
}

export default Course