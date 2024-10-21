// Importing necessary hooks from React
import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Fetching data from the server
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
  
    // Check for existing person
    const existingPerson = persons.find(person => person.name === newName);
    
    if (existingPerson) {
      // Ask for confirmation to update the number
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      
      if (confirmUpdate) {
        // Update the existing person's number
        axios.put(`http://localhost:3001/persons/${existingPerson.id}`, newPerson)
          .then(response => {
            setPersons(persons.map(person => person.id === existingPerson.id ? response.data : person));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error('Error updating person:', error);
          });
      }
    } else {
      // Add a new person
      axios.post('http://localhost:3001/persons', newPerson)
        .then(response => {
          setPersons([...persons, response.data]);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Error adding person:', error);
        });
    }
  };
  

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

<h3>Numbers</h3>
<ul>
  {persons.length > 0 ? (
    persons.map(person => (
      <li key={person.id}>
        {person.name} {person.number}
      </li>
    ))
  ) : (
    <p>No contacts available</p>
  )}
</ul>
    </div>
  );
};

export default App;
