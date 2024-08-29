import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import '../../styles/form-login.css';
import { useNavigate, Link } from 'react-router-dom'; 
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

import GoogleSignIn from './googleButton';

const validate = values => { 
  //
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length > 15) {
    errors.password = 'Must be 15 characters or less';
  }

  return errors;
};

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


//DECLARACION DEL COMPONENTE
const FormLoginComp = () => {
  //ESTADOS DEL COMPONENTE
  const { store, actions } = useContext(Context)

  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      
      const logged = await actions.login(values)
      if (logged) {
        Toast.fire({
          icon: "success",
          title: "Logged in successfully"
        });
        navigate("/")
      }else {
        Toast.fire({
          icon: "error",
          title: "Wrong email or password",
          showConfirmButton: false,
        });
        resetForm();
      }
      }
      
  });

  return (
    <div className="container">
      

      <div className="d-flex justify-content-center">
        <form className="login-form mt-5" onSubmit={formik.handleSubmit}>
          <h2 className="mt-5 text-center fw-bold">Ingresar</h2>
          <div className="text-center">
                <p className='fw-light' style={{fontSize: "15px"}}>¿No tienes cuenta? <Link className="links" to='/form-signup'>Regístrate</Link></p>
          </div>
        
          <div className="input-group input-group-sm d-flex mb-4 mt-5">
            <span className='px-2'><i className="fas fa-envelope"></i></span>
            <input
              id="email"
              name="email"
              className="w-75 ps-2"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
          <div className="error-msg ms-2">{formik.errors.email}</div>
        ) : null}
          </div>
          <div className="input-group input-group-sm d-flex mb-3">
            <span className="px-2"><i className="fas fa-lock"></i></span>
            <input
              id="password"
              name="password"
              className="w-75 ps-2"
              type="password"
              placeholder="Contraseña"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
          <div className='error-msg ms-2'>{formik.errors.password}</div>
        ) : null}
          </div>

          <div className="text-start">
            <p className='fs-8 fw-light mt-3'> <Link className="links" to="">¿Olvidaste tu contraseña?</Link></p>
          </div>
          
          <button className="w-100 my-3 btn-lg" type="submit" style={{
            backgroundColor: '#FF8A5B',
            border: 'none',
            color: '#FFFFFF',
            fontWeight: "500px",
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Ingresar
          </button>
        </form>
      </div>
      
      <div className="d-flex justify-content-center">
        <div className="login-form">

          <div className="divider-container m-0">
            <hr className="divider-line" />
              <span className="divider-text fs-6 fw-lighter">O también puedes</span>
            <hr className="divider-line" />
          </div>

          <div className='my-3'>
            <GoogleSignIn/>
          </div>
          
          
          
        </div>
      </div>  
    </div>
  );
};


export default FormLoginComp
