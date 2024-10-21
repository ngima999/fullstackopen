import React from "react";

const Persons = ({ persons, deletePerson }) => (
  <ul>
    {persons.map(person => (
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person.id)}>Delete</button>
      </li>
    ))}
  </ul>
);


export default Persons;
