const { describe, test, beforeEach } = require('node:test');
const supertest = require("supertest");
const bcrypt = require('bcrypt');
const User = require('../models/user');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const assert = require('assert');

describe('when there is initially one user in db', () => {
  // Before each test, clear the database and add a 'root' user with a hashed password
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  // Test case: creation should fail with a proper status code and message if the username is already taken
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    assert(result.body.error.includes('Username must be unique.'));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });


  // Test case: creation should succeed with a fresh (unique) username
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });


  // Test case: creation should fail if the username or password is less than 3 characters
  test('creation fails if username or password is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'ab', // Username is too short
      name: 'Short User',
      password: '12', // Password is too short
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.error, 'Both username and password must be at least 3 characters long.');

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});
