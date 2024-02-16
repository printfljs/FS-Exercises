const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
    return (
        <>
        {parts.map(part => 
            <Part key={part.id} part={part} />
        )}
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum,part)=>sum+part.exercises,0)
    return <h4>Total of {total} exercises</h4>
}
  

const Course = ({ courses }) => {
    const courseInfos=courses.map(course => (
        <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
    
    )
    return (
        <div>
        <h1>Web development curriculum</h1>
        {courseInfos}
        </div>
    )
}

export default Course