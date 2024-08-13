import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import '../../styles/form-login.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom'; 

//DECLARACION DEL COMPONENTE
const FormLoginComp = () => {
  //ESTADOS DEL COMPONENTE
  const { store, actions } = useContext(Context)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (email == "" || password == "" || username == ""){
      alert("Field must not be empty")
      return
  }
  let user_log = await actions.login(email,password)
  if (user_log) {
     navigate('/')
     alert("Logueado exitosamente")
     return
  }
  navigate('/form-signup')
  alert("User does not exist. Please signup")
  };

  const handleSignUpClick = () => {
    navigate('/form-signup'); // Redirige al formulario de registro
  };

  return (
    <div className="form-container mt-5 w-50">
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
        <p>Si aún no tienes una cuenta:</p>
        <button type="button" onClick={handleSignUpClick} style={{
          backgroundColor: '#FF8A5B',
          border: 'none',
          color: '#FFFFFF',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Registrarse
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


export default FormLoginComp