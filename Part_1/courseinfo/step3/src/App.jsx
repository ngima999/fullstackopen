
/*
Using Objects (Exercise 1.3): In this step, refactor the App component 
to define each part as an object and pass them to Content.
*/

const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({ parts }) => (
  <div>
    <Part name={parts[0].name} exercises={parts[0].exercises} />
    <Part name={parts[1].name} exercises={parts[1].exercises} />
    <Part name={parts[2].name} exercises={parts[2].exercises} />
  </div>
)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Total exercises: {total}</p>
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = { name: 'Fundamentals of React', exercises: 10 }
  const part2 = { name: 'Using props to pass data', exercises: 7 }
  const part3 = { name: 'State of a component', exercises: 14 }

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total parts={[part1, part2, part3]} />
    </div>
  )
}


export default App
