import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div> 
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total ex1={course.parts[0].exercises} ex2={course.parts[1].exercises} ex3={course.parts[2].exercises}/>
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return(
    <div>
      <h1><strong>{props.course}</strong></h1>
    </div>
  ) 
}

const Content = (props) => {
  const parts= props.parts
  return(
    <div>
      <Part parts={parts[0].name} exercise={parts[0].exercises} />
      <Part parts={parts[1].name} exercise={parts[1].exercises}/>
      <Part parts={parts[2].name} exercise={parts[2].exercises}/>
    </div>
  ) 
}


const Part = (props) => { 
  return(
    <div>
      <p>{props.parts} {props.exercise}</p>
    </div>
  ) 
}

const Total = (props) => {
  const total = props.ex1 + props.ex2 + props.ex3
  return(
    <div>
      <p>Number of exercises {total}</p>
    </div>
  ) 
}

export default App