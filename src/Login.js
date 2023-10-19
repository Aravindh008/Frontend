import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // You would typically verify the username and password with the server here.
    // If login successful:
    navigate('/customers');
  }

  return (
    <div className="login-container">

      <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
        <input 
          className="input-field"
          type="text" 
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input 
          className="input-field"
          type="password" 
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="submit-button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
