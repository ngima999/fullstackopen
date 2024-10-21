import { useEffect, useState } from 'react';
import PersonService from './PersonService'; // Ensure this module handles API calls correctly.

const App = () => {
  const [persons, setPersons] = useState([]); // State to hold the list of persons
  const [newName, setNewName] = useState(''); // State to hold the new name input
  const [newNumber, setNewNumber] = useState(''); // State to hold the new number input
  const [filter, setFilter] = useState(''); // State to hold the filter input

  // Fetch all persons when the component mounts
  useEffect(() => {
    PersonService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check for existing persons by name
    const existingPersons = persons.filter(person => person.name === newName);

    if (existingPersons.length > 0) {
      // Confirm with the user if they want to replace the number
      const confirmUpdate = window.confirm(
        `${newName} already exists in the phonebook. Replace the old number(s) with the new one?`
      );

      // If the user confirms the update
      if (confirmUpdate) {
        existingPersons.forEach(existingPerson => {
          const updatedPerson = { ...existingPerson, number: newNumber }; // Create the updated person object

          // Send PUT request to update the person
          PersonService
            .update(existingPerson.id, updatedPerson)
            .then(returnedPerson => {
              // Update the state with the modified person
              setPersons(persons.map(person => (person.id === existingPerson.id ? returnedPerson : person)));
            })
            .catch(error => {
              console.error('Error updating person:', error);
            });
        });
        // Clear input fields after update
        setNewName('');
        setNewNumber('');
      }
    } else {
      // If no existing person is found, create a new one
      const newPerson = { name: newName, number: newNumber };

      // Send POST request to create new person
      PersonService
        .create(newPerson)
        .then(returnedPerson => {
          // Update state with the new person
          setPersons(persons.concat(returnedPerson));
          setNewName(''); // Clear input fields
          setNewNumber('');
        })
        .catch(error => {
          console.error('Error adding person:', error);
        });
    }
  };

  const deletePerson = (id) => {
    // Confirm deletion
    if (window.confirm('Are you sure you want to delete this person?')) {
      PersonService
        .remove(id) // Send DELETE request to remove person
        .then(() => {
          // Update state to remove the deleted person
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Error deleting person:', error);
        });
    }
  };

  // Filter the list of persons based on the filter input
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <div style={{ marginBottom: '40px' }}>
        filter shown with: <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <form onSubmit={addPerson}>
      <div style={{ marginBottom: '10px' }}>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      <ul>
        {filteredPersons.map(person => (
          <li key={person.id} style={{marginBottom: '20px'}}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
