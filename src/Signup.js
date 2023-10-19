import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send user information to the server to create a new account.
    // Then:
    navigate('/login');
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username"
          value={userInfo.username}
          onChange={e => setUserInfo({ ...userInfo, username: e.target.value })}
        />
        <input 
          type="password" 
          placeholder="Password"
          value={userInfo.password}
          onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
