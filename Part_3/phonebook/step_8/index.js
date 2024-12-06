const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json()); // Middleware for parsing JSON

// Custom Morgan token to log request body for POST requests
morgan.token('body', (req) => {
  // Only log body for POST requests, otherwise return an empty string
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

// Morgan middleware with custom token and tiny format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: (req) => req.method !== 'POST', // Only log the body for POST requests
}));

const persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
];

// Routes
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  const count = persons.length;
  const date = new Date();
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `);
});

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id);
  
  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  // Check for missing fields
  if (!name || !number) {
    return res.status(400).json({ error: 'Name or number is missing' });
  }

  // Check for duplicate names
  if (persons.some(p => p.name === name)) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  // Create a new entry
  const newPerson = {
    id: Math.floor(Math.random() * 10000).toString(), // Generate a random ID
    name,
    number,
  };

  persons.push(newPerson);
  res.json(newPerson);
});

app.delete('/api/persons/:id', (req, res) => {
  const index = persons.findIndex(p => p.id === req.params.id);
  
  if (index !== -1) {
    persons.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
