import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from 'formik';
import Swal from 'sweetalert2'
import "../../styles/formSignupComp.css"

const SignUpComp = () => {
//
  const validate = values => {
    const errors = {};
  
    if (!values.nombre) {
      errors.nombre = 'Required';
    } else if (values.nombre.length > 50) {
      errors.nombre = 'Must be 50 characters or less';
    }
  
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length > 200) {
      errors.password = 'Must be 200 characters or less';
    }
    
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Password doesn't match";
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.telefono.length > 25) {
      errors.telefono = 'Must be 25 characters or less';
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
  
  const navigate = useNavigate();
  const { actions } = useContext(Context)


  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
      telefono: ''
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      const signup = await actions.signup(values);
      if (signup) {
        Toast.fire({
          icon: "success",
          title: "Registrado con éxito"
        });
        navigate("/")
      }else{
        Toast.fire({
          icon: "error",
          title: "El email ya está registrado",
          showConfirmButton: false,
        });
        resetForm();
      }
    },
  });
  

  return (
    <div className="container">
      

      <div className="d-flex justify-content-center">
        <form className="signup-form mt-5 mb-5" onSubmit={formik.handleSubmit}>
          <h2 className="mt-5 text-center fw-bold">REGISTRATE</h2>
          <div className="text-center">
                <p className='fw-light' style={{fontSize: "15px"}}>¿Tienes una cuenta? <Link className="links" to='/form-login'>Ingresa</Link></p>
          </div>


          <div className="input-group input-group-sm d-flex mb-4 mt-5">
            <span className='px-2'><i className="fas fa-user"></i></span>
            <input
              id="nombre"
              name="nombre"
              className="w-75 ps-2"
              type="text"
              placeholder="Nombre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
            />
            {formik.touched.nombre && formik.errors.nombre ? (
          <div className="error-msg ms-2">{formik.errors.nombre}</div>
          ) : null}
          </div>
        <div className="input-group input-group-sm d-flex mb-4">
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
          <div className='error-msg ms-2'>{formik.errors.email}</div>
        ) : null}
          </div>
          <div className="input-group input-group-sm d-flex mb-4">
            <span className='px-2'><i className="fas fa-lock"></i></span>
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
          <div className="input-group input-group-sm d-flex mb-4">
            <span className='px-2'><i className="fas fa-lock"></i></span>
            <input
              id="confirmPassword"
              name="confirmPassword"
              className="w-75 ps-2"
              type="password"
              placeholder="Confirmar contraseña"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className='error-msg ms-2'>{formik.errors.confirmPassword}</div>
        ) : null}
          </div>
          <div className="input-group input-group-sm d-flex mb-4">
            <span className='px-2'><i className="fa-solid fa-phone"></i></span>
            <input
              id="telefono"
              name="telefono"
              className="w-75 ps-2"
              type="text"
              placeholder="Teléfono/Celular (Opcional)"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.telefono}
            />
            {formik.touched.telefono && formik.errors.telefono ? (
          <div className='error-msg ms-2'>{formik.errors.telefono}</div>
        ) : null}
          </div>
          <div className="alternative-login" style={{ textAlign: 'center' }}>
            <button className="btn-lg" type="submit" style={{
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
        </form>
      </div>

    </div>
  );
};

export default SignUpComp;
