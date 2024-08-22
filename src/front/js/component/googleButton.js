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
            login_uri: 'https://super-chainsaw-jjr69gx4w4gg35w65-3001.app.github.dev/api/valid-token-google'
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
        nav("/")
        return "https://super-chainsaw-jjr69gx4w4gg35w65-3000.app.github.dev/form-login"

    };

    return <div id="buttonDiv"></div>;
};

export default GoogleSignIn;