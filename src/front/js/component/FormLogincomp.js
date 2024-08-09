import React, { useState } from 'react';
import '../../styles/form-login.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

//DECLARACION DEL COMPONENTE
const FormLogincomp = () => {
  //ESTADOS DEL COMPONENTE
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
    <div className="form-container" style={{ width: '300px', margin: '0 auto' }}>
      <h2>INGRESAR</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <span className="icon" style={{ marginRight: '10px' }}>👤</span>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div className="input-group" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <span className="icon" style={{ marginRight: '10px' }}><i className="fas fa-envelope"></i></span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div className="input-group" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <span className="icon" style={{ marginRight: '10px' }}><i className="fas fa-lock"></i></span>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
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
          Ingresar
        </button>
      </form>
      <hr />
      <div className="alternative-login" style={{ textAlign: 'center' }}>
        <p>O REGISTRATE</p>
        <button type="submit" style={{
          backgroundColor: '#FF8A5B',
          border: 'none',
          color: '#FFFFFF',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Sign in
        </button>
        {/* <button className="google-btn" style={{
          backgroundColor: '#4285F4',
          color: '#FFFFFF',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          marginBottom: '10px'
        }}>
          <i className="fab fa-google" style={{ marginRight: '10px' }}></i> Sign in with Google
        </button> */}
      </div>
    </div>
  );
};


export default FormLogincomp