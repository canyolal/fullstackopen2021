import React from 'react'
import Header from './Header.js'

const Course = ({course}) => {
    return(
        <div>
            <h1>
                Web Development Curriculum
            </h1>
            {course.map(course =>
                <Header key={course.id} courses={course} />
            )}
        </div>
      
    )
}

export default Course