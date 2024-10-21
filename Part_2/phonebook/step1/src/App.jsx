import { useState } from 'react'

const App = () => {
  // State for storing the list of persons
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  
  // State for storing the current input value for the new person's name
  const [newName, setNewName] = useState('')

  // Event handler for updating the 'newName' state with user input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Event handler for form submission to add a new person
  const addPerson = (event) => {
    event.preventDefault()  // Prevents page reload on form submission
    
    // Create a new person object with the input name
    const newPerson = { name: newName }

    // Add the new person to the existing 'persons' array
    setPersons([...persons, newPerson])

    // Clear the input field after adding the person
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Form for adding a new person */}
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {/* Render the list of persons */}
      <ul>
        {persons.map(person => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
