const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user');







usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})



usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;

  // Validation: Ensure both username and password are provided and have at least 3 characters
  if (!username || !password || password.length < 3 || username.length < 3) {
    return response.status(400).json({
      error: 'Both username and password must be at least 3 characters long.',
    });
  }

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({
        error: 'Username must be unique.',
      });
    }

    // Hash the password before saving the user
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error); // Forward error to the error handler middleware
  }
});



module.exports = usersRouter;