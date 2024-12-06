const express = require('express');
const app = express();




const persons = [
    { id: "1", name: "Arto Hellas", number: "040-123456" },
    { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
    { id: "3", name: "Dan Abramov", number: "12-43-234345" },
    { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
  ];

// app.use(express.json());

app.post('/api/persons', (req, res) => {
  const body = req.body;

  // Check for missing fields
  if (!body.name || !body.number) {
      return res.status(400).json({ error: 'Name or number is missing' });
  }

  // Check for duplicate names
  const nameExists = persons.some(person => person.name === body.name);
  if (nameExists) {
      return res.status(400).json({ error: 'Name must be unique' });
  }

  // Create a new entry
  const newPerson = {
      id: Math.floor(Math.random() * 10000).toString(), // Generate a random ID
      name: body.name,
      number: body.number,
  };

  persons.push(newPerson);
  res.json(newPerson);
});





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


  app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const index = persons.findIndex(p => p.id === id);
  
    if (index !== -1) {
      persons.splice(index, 1);
      res.status(204).end();
    } else {
      res.status(404).send({ error: 'Person not found' });
    }
  });
  

  

  app.listen(3001, ()=>{
   console.log("Server running on port 3001");
  })