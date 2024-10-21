// Importing necessary hooks from React
import { useState } from 'react';

// Main App component
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState(''); // New state for phone number

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)  // Update phone number state
  };


  const addPerson = (event) => {
    event.preventDefault();
   
    
    // Check for duplicate name
  if (persons.some(person => person.name === newName)) {
    alert(`${newName} is already added to phonebook`)
  } else {
    const newPerson = { name: newName, number: newNumber }
    setPersons([...persons, newPerson])
    setNewName('')  // Clear name input
    setNewNumber('')  // Clear number input
  }
  };

  const [filter, setFilter] = useState('')  // State for filter input

const handleFilterChange = (event) => {
  setFilter(event.target.value)  // Update filter state with user input
}

return (
  <div>
    <h2>Phonebook</h2>

    {/* Search filter input */}
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>

    <h3>Add a new</h3>
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

    <h3>Numbers</h3>
    <ul>
      {persons
        .filter(person => 
          person.name.toLowerCase().includes(filter.toLowerCase())  // Case-insensitive filtering
        )
        .map(person => (
          <li key={person.name}>{person.name} {person.number}</li>
        ))}
    </ul>
  </div>
)
};


export default App;