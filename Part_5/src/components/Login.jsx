import React from 'react'
import PropTypes from 'prop-types' // Import PropTypes

const Login = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            placeholder='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            autoComplete="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            placeholder='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

// Define PropTypes for validation
Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default Login
