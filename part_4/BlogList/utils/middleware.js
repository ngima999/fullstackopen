const jwt = require('jsonwebtoken');
const User = require('../models/user');



const userExtractor = async (request, response, next) => {
  const authorization = request.get('Authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      request.user = await User.findById(decodedToken.id);
    } catch (error) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
  } else {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  next();
};



const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  request.token = authorization && authorization.startsWith('Bearer ')
    ? authorization.replace('Bearer ', '')
    : null;

  next();
};



const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })

  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid or expired token' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Token has expired' });
  }

  next(error)
}

module.exports = { userExtractor, tokenExtractor, errorHandler };