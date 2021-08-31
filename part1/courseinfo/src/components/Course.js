import React from 'react'
import Header from './Header.js'
import Content from './Content.js'

const Course = ({course}) => {
    console.log(course.parts)
    return(
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
        </div>
      
    )
  }

export default Course