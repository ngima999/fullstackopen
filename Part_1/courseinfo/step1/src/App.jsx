
const Header = ({ course }) => <h1>{course}</h1>

// Part component: Displays the name of the part and its exercise count, both passed as props
const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

// Content component: Renders all the parts of the course by iterating over the `parts` array.
// For each part, it renders a Part component, passing the name and exercise count as props.
const Content = ({ parts }) => (
  <div>
    {parts.map((part, index) => (
      <Part key={index} name={part.name} exercises={part.exercises} />
    ))}
  </div>
)

// Total component: Calculates the total number of exercises by reducing the `parts` array.
// It then displays the total count in a paragraph.
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Total exercises: {total}</p>
}

// App component: Main application component.
// Defines the course name and the parts array, each part containing a name and exercise count.
// Passes the course name to Header, the parts array to Content, and the same array to Total.
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
