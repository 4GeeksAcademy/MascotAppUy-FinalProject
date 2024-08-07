// src/front/js/component/form-login.js
import React, { useState } from 'react';
import './form-login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


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
          <span className="icon"><i className="fas fa-envelope"></i></span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="icon"><i className="fas fa-lock"></i></span>
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
            {/* Al presionar el botón deberá redirigir hacia la página principal */}
            
      </form>
      <hr />
      <div className="alternative-login">
        <p>O</p>
        <button className="google-btn">
            <i className="fab fa-google"></i> Sign in with Google
        </button>
        <button className="microsoft-btn">
            <i className="fab fa-microsoft"></i> Sign in with Microsoft
        </button>
        <button className="apple-btn">
            <i className="fab fa-apple"></i> Sign in with Apple
        </button>
      </div>
    </div>
  );
};

export default FormLogin;
