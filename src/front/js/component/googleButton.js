import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom'; 
import "../../styles/form-login.css"
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

const GoogleSignIn = () => {
    const { actions } = useContext(Context);
    const nav = useNavigate();

    useEffect(() => {
        /* Initialize the Google Sign-In client */
        window.google.accounts.id.initialize({
            client_id: '146502115643-3dktgv73sc158t43pvomala9ueg6taah.apps.googleusercontent.com',
            callback: handleCredentialResponse,
            // login_uri: 'https://super-chainsaw-jjr69gx4w4gg35w65-3001.app.github.dev/api/valid-token-google'
        });

        /* Render the Google Sign-In button */
        window.google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { 
            theme: 'outline', 
            size: 'large',
            text: 'continue_with', // Opciones: 'signin_with', 'signup_with', 'continue_with', 'signin'
            shape: 'rectangular'  
        } // customization options
        );

        /* Optional: Automatically prompt the user to sign in */
        window.google.accounts.id.prompt(); 
    }, []);

    const handleCredentialResponse = async (response) => {
        // Guarda el token en el localStorage
        localStorage.setItem('access_token', response.credential);
        // Envía el token al backend para validación
        actions.validateTokenGoogle();
        Toast.fire({
            icon: "success",
            title: "Login exitoso"
          });
        nav("/")
        // return "https://super-chainsaw-jjr69gx4w4gg35w65-3000.app.github.dev/form-login"

    };

    return (
<<<<<<< HEAD
        <div className="w-100 google-btn mb-5 d-flex justify-content-center" id="buttonDiv">
            <button></button>
=======
        <div className="google-btn mb-5 pb-5" id="buttonDiv">
            <button 
                type="button" 
                className="btn btn-custom" 
            >
            </button>
>>>>>>> 43529e0ee559e821597af654879ac9bda170ac34
        </div>
    );
};

export default GoogleSignIn;