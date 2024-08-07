// src/front/js/component/form-login.js
import React, { useState } from 'react';
import './form-login.css';
import { FaGoogle } from 'react-icons/fa'

const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="form-container">
      <h2>REGÍSTRATE</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <span className="icon">👤</span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="icon">📧</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="icon">🔑</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" style={{ 
                backgroundColor: '#FF8A5B', 
                border: 'none', 
                color: '#FFFFFF',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>
                Submit
            </button>
      </form>
      <hr />
      <div className="alternative-login">
        <p>Or</p>
        <button className="google-btn">Sign in with Google</button>
        <button className="microsoft-btn">Sign in with Microsoft</button>
        <button className="apple-btn">Sign in with Apple</button>
      </div>
    </div>
  );
};

export default FormLogin;
