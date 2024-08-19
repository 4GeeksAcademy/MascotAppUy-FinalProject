import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

const PerfilMock = () => {

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [edit, setEdit] = useState(false);

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
            ) : (
                <div>
                    <h1 className="text-center">Bienvenido/a {store.user.nombre}</h1>
                    <h6 className="text-center mt-5">Email: {store.user.email}</h6>
                    <h6 className="text-center">Nombre: {store.user.nombre}</h6>
                    <h6 className="text-center">Telefono: {store.user.telefono}</h6>
                    <h6 className="text-center">Contraseña: {store.user.password}</h6>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => setEdit(true)}><i className="fas fa-edit"></i></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PerfilMock;