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


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} /> {/* New input for number */}
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name} {person.number}</li> 
        ))}
      </ul>
    </div>
  );
};


export default App;