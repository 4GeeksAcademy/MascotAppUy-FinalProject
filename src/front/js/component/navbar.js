import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../img/logo1.png';

export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav style={{
            backgroundColor: '#040626',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            width: '100%',
            boxSizing: 'border-box',
            justifyContent: 'space-between' 
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="Logo" style={{
                    height: '60px',
                    marginRight: '15px'
                }} />
                <span style={{
                    color: '#FFFFFF',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}>MascotApp</span>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
                <button 
                    onClick={() => navigate('/')} 
                    style={{
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        fontSize: '18px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Inicio
                </button>
                <button 
                    onClick={() => navigate('/about')} 
                    style={{
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        fontSize: '18px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Quienes somos
                </button>
                <button 
                    onClick={() => navigate('/faq')} 
                    style={{
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        fontSize: '18px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Preguntas frecuentes
                </button>
            </div>
        </nav>
    );
};
