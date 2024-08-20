import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

const PerfilMock = () => {

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [editPassword, setEditPassword] = useState(false)

    // ********* FORMIK PARA EDITAR DATOS GENERALES**********
    const validate = values => {
        const errors = {};
      
        if (!values.nombre) {
          errors.nombre = 'Required';
        } else if (values.nombre.length > 50) {
          errors.nombre = 'Must be 50 characters or less';
        }
    
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
    
        if (values.telefono && values.telefono.length > 25) {
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

    const formik = useFormik({
        initialValues: {
          nombre: store.user.nombre || '',
          email: store.user.email || '',
          telefono: store.user.telefono || ''
        },
        validate,
        onSubmit: async (values) => {
          const userData = {
            nombre: values.nombre || store.user.nombre,
            email: values.email || store.user.email,
            telefono: values.telefono || store.user.telefono
          };
          
          const newData = await actions.editarUsuario(userData);

          if (newData) {
            Toast.fire({
              icon: "success",
              title: "User data edited successfully"
            });
            setEdit(false);
          } else {
            Toast.fire({
              icon: "error",
              title: "Failed to update data",
              showConfirmButton: false,
            });
          }
        },
    });

    // ********* FORMIK PARA EDITAR CONTRASEÑA**********
    const formikPassword = useFormik({
        initialValues: {
            nombre: store.user.nombre || '',
            email: store.user.email || '',
            telefono: store.user.telefono || '',
            newPassword: '',
            confirmPassword: ''
        },
        validate: (values) => {
            const errors = {};
            
            if (!values.newPassword) {
                errors.newPassword = 'New password is required';
            } else if (values.newPassword.length > 200) {
                errors.newPassword = 'Password can not be longer than 200 characters';
            }
            if (values.newPassword !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }
            return errors;
        },
        onSubmit: async (values) => {
            const success = await actions.editarUsuario(values);
            if (success) {
                Toast.fire({
                    icon: 'success',
                    title: 'Password updated successfully'
                });
                setEditPassword(false);
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Failed to update password'
                });
            }
        }
    });
// ********* FIN FORMIK PARA EDITAR CONTRASEÑA**********

    // Actualiza los valores de Formik después de que el usuario haya sido editado
    useEffect(() => {
        if (store.user) {
            formik.setValues({
                nombre: store.user.nombre || '',
                email: store.user.email || '',
                telefono: store.user.telefono || ''
            });
        }
    }, [store.user]); // Ejecuta este efecto cuando store.user cambie

    return (
        <div className="container mt-5">
            {edit ? (
                <div className="form-container mt-5 w-50">
                    <h2>Editar datos</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="input-group d-flex mb-4">
                            <span className='px-2'><i className="fas fa-user"></i></span>
                            <input
                                id="nombre"
                                name="nombre"
                                className="w-75 ps-2"
                                type="text"
                                placeholder={store.user.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombre}
                            />
                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className="error-msg ms-2">{formik.errors.nombre}</div>
                            ) : null}
                        </div>
                        <div className="input-group d-flex mb-4">
                            <span className='px-2'><i className="fas fa-envelope"></i></span>
                            <input
                                id="email"
                                name="email"
                                className="w-75 ps-2"
                                type="email"
                                placeholder={store.user.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className='error-msg ms-2'>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="input-group d-flex mb-4">
                            <span className='px-2'><i className="fa-solid fa-phone"></i></span>
                            <input
                                id="telefono"
                                name="telefono"
                                className="w-75 ps-2"
                                type="text"
                                placeholder={store.user.telefono}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.telefono}
                            />
                            {formik.touched.telefono && formik.errors.telefono ? (
                                <div className='error-msg ms-2'>{formik.errors.telefono}</div>
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
                            Enviar
                        </button>
                    </form>
                </div>
            ) : editPassword ? (
                <div className="form-container mt-5 w-50">
                    <h2>Cambiar contraseña</h2>
                    <form onSubmit={formikPassword.handleSubmit}>
        
                        <div className="input-group d-flex mb-4">
                            <span className='px-2'><i className="fas fa-key"></i></span>
                            <input
                                id="newPassword"
                                name="newPassword"
                                className="w-75 ps-2"
                                type="password"
                                placeholder="Nueva contraseña"
                                onChange={formikPassword.handleChange}
                                onBlur={formikPassword.handleBlur}
                                value={formikPassword.values.newPassword}
                            />
                            {formikPassword.touched.newPassword && formikPassword.errors.newPassword ? (
                                <div className="error-msg ms-2">{formikPassword.errors.newPassword}</div>
                            ) : null}
                        </div>
                        <div className="input-group d-flex mb-4">
                            <span className='px-2'><i className="fas fa-key"></i></span>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                className="w-75 ps-2"
                                type="password"
                                placeholder="Confirma nueva contraseña"
                                onChange={formikPassword.handleChange}
                                onBlur={formikPassword.handleBlur}
                                value={formikPassword.values.confirmPassword}
                            />
                            {formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword ? (
                                <div className="error-msg ms-2">{formikPassword.errors.confirmPassword}</div>
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
                            Cambiar contraseña
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1 className="text-center">Bienvenido/a {store.user.nombre}</h1>
                    <h6 className="text-center mt-5">Email: {store.user.email}</h6>
                    <h6 className="text-center">Nombre: {store.user.nombre}</h6>
                    <h6 className="text-center">Telefono: {store.user.telefono}</h6>
                    <h6 className="text-center">Contraseña: {store.user.password}</h6>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => setEdit(true)}><i className="fas fa-edit"></i></button>
                        <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => setEditPassword(true)}><i className="fas fa-edit"></i>Cambiar contraseña</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PerfilMock;