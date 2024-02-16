import { useState } from 'react'

const Statistics = ({good,neutral,bad}) => {
  if(good+neutral+bad==0){
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>Statistics</h1>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine text="average" value={good + neutral + bad === 0 ? 0 : ((good - bad) / (good + neutral + bad))} />
      <StatisticLine text="positive" value={good + neutral + bad === 0 ? 0 : ((good) / (good + neutral + bad) * 100)+'%'} />
    </>
  )
}

const StatisticLine = ({text,value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Button = ({onClick,text}) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>&nbsp;
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App