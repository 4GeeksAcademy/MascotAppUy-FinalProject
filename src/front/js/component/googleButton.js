import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom'; 

const GoogleSignIn = () => {
    const { actions } = useContext(Context);
    const nav = useNavigate();

    useEffect(() => {
        /* Initialize the Google Sign-In client */
        window.google.accounts.id.initialize({
            client_id: '146502115643-3dktgv73sc158t43pvomala9ueg6taah.apps.googleusercontent.com',
            callback: handleCredentialResponse,
        });

        /* Render the Google Sign-In button */
        window.google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: 'outline', size: 'large' } // customization options
        );

        /* Optional: Automatically prompt the user to sign in */
        window.google.accounts.id.prompt(); 
    }, []);

    const handleCredentialResponse = async (response) => {
        // Guarda el token en el localStorage
        localStorage.setItem('access_token', response.credential);
        // Envía el token al backend para validación
        actions.validateTokenGoogle();
    };

    return <div id="buttonDiv"></div>;
};

export default GoogleSignIn;