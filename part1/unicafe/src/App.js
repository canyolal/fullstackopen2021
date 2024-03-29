import React, { useState } from 'react'

const Button = ({text,handleClick}) => ( <button onClick={handleClick}> {text} </button> )

const Header = ({text}) => {
  return(
    <div>
      <h2><strong>{text}</strong></h2>
    </div>
  )
}

const Statistics = ({good,bad,neutral}) => {
  const total = good + bad + neutral
  const avg = (good*1 + bad*(-1) + neutral*0) / (good+bad+neutral)
  const positive = good / (good+bad+neutral) *100

  if (good===0 && bad === 0 && neutral === 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <table>
      <tbody>
        <tr>
          <td> <StatisticsLine inp="good" /> </td>
          <td> <StatisticsLine inp={good} /> </td>
        </tr>
        <tr>
          <td> <StatisticsLine inp="neutral" /> </td>
          <td> <StatisticsLine inp={neutral} /> </td>
        </tr>
        <tr>
          <td> <StatisticsLine inp="bad" /> </td>
          <td> <StatisticsLine inp={bad} /> </td>
        </tr>
        <tr>
          <td> all</td>
          <td> {total}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{avg}</td>
        </tr>
        <tr>
          <td>Positive </td>
          <td>{positive}%</td>
        </tr>
      </tbody>
    </table> 
      
      
  )
}

const StatisticsLine = ({inp}) => {
  return(
    <div>
      {inp}
      <br />
    </div>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    return(
      setGood(good +1)
    )
  }

  const handleBadClick = () => {
    return(
      setBad(bad +1)
    )
  }

  const handleNeutralClick = () => {
    return(
      setNeutral(neutral +1)
    )
  }

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <br />
      <br />
      <Header text="statistics" />
      <Statistics bad={bad} good={good} neutral={neutral} />
    </div>
  )
}

export default App
