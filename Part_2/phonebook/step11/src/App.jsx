import { useState, useEffect } from 'react';
import personService from './PersonService';
import Persons from './Persons';
import PersonForm from './PersonForm';
import Notification from './Notification';  // Importing the new Notification component

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState({ message: null, type: '' });
  const [filter, setFilter] = useState('');

  // Fetch initial data from the server
  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

  // General notification handler
  const handleNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: '' }), 5000);
  };

  // Add or update person details
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };

    const existingPerson = persons.find(p => p.name === newName);
    if (existingPerson) {
      const updatedPerson = { ...existingPerson, number: newNumber };

      personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => (p.id !== existingPerson.id ? p : returnedPerson)));
          handleNotification(`Updated ${newName}'s number`, 'success');
        })
        .catch((error) => {
          handleNotification(`Error: ${newName} was already removed from the server.`, 'error');
          setPersons(persons.filter(p => p.id !== existingPerson.id));
        });
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          handleNotification(`Added ${newName}`, 'success');
        })
        .catch((error) => {
          handleNotification(error.response.data.error);
          setTimeout(() => {
            handleNotification("");
          }, 8000);
        });
    }
    setNewName('');
    setNewNumber('');
  };

  // Delete person and handle errors
  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    if (person && window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          handleNotification(`Deleted ${person.name}`, 'success');
        })
        .catch((error) => {
          handleNotification(`Error: ${person.name} was already removed from the server.`, 'error');
          setPersons(persons.filter(p => p.id !== id));
        });
    }
  };

  // Filter persons based on the filter input
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />

      <div style={{ marginTop: '30px', marginBottom: '30px' }}>
        filter shown with: <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={(e) => setNewName(e.target.value)}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={handleDelete} />
    </div>
  );
};

export default App;
