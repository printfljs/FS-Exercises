
const Header=(props)=>{
  return(
    <h1>{props.course}</h1>
  )
}

const Content=(props)=>{
  console.log(props)
  return(
    <>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </>
  )
}

const Part=(props)=>{
  return(
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Total=(props)=>{
  let sum = 0
  props.parts.map(element => {
    sum += element.exercises;
    return sum;
  });
  return (
    <p>Number of exercises {sum}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1,part2,part3]}/>  
      <Total parts={[part1,part2,part3]}/>  
    </div>
  )
}

export default App