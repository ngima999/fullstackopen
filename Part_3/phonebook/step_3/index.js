const express = require('express');
const app = express();

const persons = [
    { id: "1", name: "Arto Hellas", number: "040-123456" },
    { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
    { id: "3", name: "Dan Abramov", number: "12-43-234345" },
    { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
  ];


  app.get('/api/persons', (req, res)=>{
    res.json(persons);
  });


  app.get('/info', (req, res)=>{
    const count = persons.length;
    const date = new Date();
    res.send(`
      <p>Phonebook has inof for 2 people</p>
      <p>${date}</p>
      `);
  });


  app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);
  
    if (person) {
      res.json(person);
    } else {
      res.status(404).send({ error: 'Person not found' });
    }
  });

  

  app.listen(3001, ()=>{
   console.log("Server running on port 3001");
  })