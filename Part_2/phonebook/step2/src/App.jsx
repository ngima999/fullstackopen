// Importing necessary hooks from React
import { useState } from 'react';

// Main App component
const App = () => {
  // State to hold the list of persons in the phonebook
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  // State to hold the input value for a new name
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault()
  
    // Check if the name already exists in the phonebook
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName }
      setPersons([...persons, newPerson])
      setNewName('')  // Clear input after adding
    }
  }
  

const handleNameChange = (event) => {
  setNewName(event.target.value);
};

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}> {/* Attach the addPerson function to form submission */}
        <div>
          name: <input value={newName} onChange={handleNameChange} /> {/* Controlled input */}
        </div>
        <div>
          <button type="submit">add</button> {/* Submit button */}
        </div>
      </form>
      <h2>Numbers</h2>
      
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li> // Display the list of persons
        ))}
      </ul>
    </div>
  );
};

export default App; // Export the App component
