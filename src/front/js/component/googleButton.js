import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom'; 


const GoogleSignIn = () => {
    const { actions } = useContext(Context)
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

  const handleCredentialResponse = (response) => {
        localStorage.setItem('access_token', response.credential)
        actions.setGoogle({user:true})
        nav("/")
    // console.log(response);
    // console.log('Encoded JWT ID token: ' + response.credential);
    // Send the token to your backend for verification and authentication
  };

  return <div id="buttonDiv"></div>;
};

export default GoogleSignIn;