import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import '../../styles/form-login.css'
import { useNavigate } from 'react-router-dom'; 
import { useFormik } from 'formik';
import Swal from 'sweetalert2'
import "../../styles/formularios.css"

const validate = values => {
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
    <div className="form-container mt-5 w-50">
      <h2>INGRESAR</h2>
      <form onSubmit={formik.handleSubmit}>
        
        <div className="input-group d-flex mb-4">
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
        <div className="input-group d-flex mb-3">
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
        <button type="button" 
        onClick={() => navigate('/form-signup')} 
        style={{
          backgroundColor: '#FF8A5B',
          border: 'none',
          color: '#FFFFFF',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Registrarse
        </button>
        
      </div>
    </div>
  );
};


export default FormLoginComp
