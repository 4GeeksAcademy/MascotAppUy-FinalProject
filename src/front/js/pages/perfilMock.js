import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
// import MascotaCard from "../component/mascotaCard.jsx";
import { MiMascotaCard } from "../component/miMascotaCard";

const PerfilMock = () => {

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [editPassword, setEditPassword] = useState(false)
    const [editMascota, setEditMascota] = useState(null);



   

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

// ********* FORMIK PARA EDITAR MASCOTAS**********

const [departamentoSelected, setDepartamentoSelected] = useState("");
    const [filteredLocalidades, setFilteredLocalidades] = useState([]);

    const [especieSelected, setEspecieSelected] = useState("");
    const [filteredRazas, setFilteredRazas] = useState([]);

    const nav = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);


const validateMascota = values => {
    const errors = {};
    if (!values.nombre) {
        errors.nombre = 'Required';
    } else if (values.nombre.length > 50) {
        errors.nombre = 'Must be 50 characters or less';
    }
    const today = new Date();

    today.setHours(0, 0, 0, 0); // Establecer la hora a medianoche
    const todayDateString = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD


    if (!values.estado) {
      errors.estado = 'Requerido';
    }
  
    if (!values.nombre) {
      errors.nombre = 'Requerido';
    } else if (values.nombre.length > 120) {
      errors.nombre = 'Debe ser 120 caracteres o menos';
    }
    if (!values.fecha_perdido) {
        errors.fecha_perdido = 'Requerido';
    }
    if (!values.sexo) {
        errors.sexo = 'Requerido';
    }

    if (!values.especie_id) {
        errors.especie_id = 'Requerido';
    }
    if (!values.raza_id) {
        errors.raza_id = 'Requerido';
    }
    if (!values.descripcion) {
        errors.descripcion = 'Requerido';
    }
    if (!values.fecha_perdido) {
        errors.fecha_perdido = 'Requerido';
    }else {
        // Convertir fecha_perdido a formato YYYY-MM-DD para compararla
        const fechaPerdidoDateString = values.fecha_perdido;
        if (fechaPerdidoDateString > todayDateString) {
          errors.fecha_perdido = 'La fecha no puede ser en el futuro';
        }
    }
    
    if(values.estado !== 'ENCONTRADO'){
        if (!values.edad) {
            errors.edad = 'Requerido';
        } 
    }
    if (!values.departamento_id) {
        errors.departamento_id = 'Requerido';
    }
    if (!values.localidad_id) {
        errors.localidad_id = 'Requerido';
    }

    return errors;
};

    const formikMascota = useFormik({
        // initialValues: {
        //     estado: '',
        //     nombre: '',
        //     edad: '',
        //     sexo: '',
        //     especie_id: '',
        //     raza_id: '',
        //     descripcion: '',
        //     fecha_perdido: '',
        //     departamento_id: '',
        //     localidad_id: ''
        // },
        validate: validateMascota,
        onSubmit: async (values) => {
            console.log(values);
            
            // const success = await actions.editarMascota(editMascota, values);
            // if (success) {
            //     Toast.fire({
            //         icon: 'success',
            //         title: 'Mascota updated successfully'
            //     });
            //     setEditMascota(null); // Close the edit form
            // } else {
            //     Toast.fire({
            //         icon: 'error',
            //         title: 'Failed to update Mascota'
            //     });
            // }
        }
    });


    // UseEffects de los filtros para actualizar mascotas
    useEffect(() => {
        if (departamentoSelected) {
            const filterLoc = store.localidades.filter(localidad =>
                localidad.departamento_id === parseInt(departamentoSelected)
            );
            setFilteredLocalidades(filterLoc);
        } else {
            setFilteredLocalidades([]);
        }
    }, [departamentoSelected, store.localidades]);

    useEffect(() => {
        if(especieSelected) {
            const filterRaza = store.razas.filter(raza => 
                raza.especie_id === parseInt(especieSelected)
            );
            setFilteredRazas(filterRaza)
            // console.log("Raza Filtradas:"+ filterRaza);
            
        } else {
            setFilteredRazas(store.razas)
        }

    }, [especieSelected, store.razas])
    //Cierre




    // Actualiza los valores de Formik después de que el usuario haya sido editado
    useEffect(() => {
        
        if (store.user) {
            
            formik.setValues({
                nombre: store.user.nombre || '',
                email: store.user.email || '',
                telefono: store.user.telefono || '',
                
                
            });
            console.log(store.user.mascotas);
            
            
        }
    }, [store.user]); // Ejecuta este efecto cuando store.user cambie

    useEffect(() => {
        console.log(editMascota);
        
        if (editMascota && store.user.mascotas) {
            const mascota = store.user.mascotas.find(m => m.id === editMascota);
            if (mascota) {
                formikMascota.setValues({
                    estado: mascota.estado || '',
                    nombre: mascota.nombre || '',
                    edad: mascota.edad || '',
                    sexo: mascota.sexo || '',
                    especie_id: mascota.especie_id || '',
                    raza_id: mascota.raza_id || '',
                    fecha_perdido: mascota.fecha_perdido || '',
                    descripcion: mascota.descripcion || '',
                    departamento_id: mascota.departamento_id || '',
                    localidad_id: mascota.localidad_id || ''
            
                });
            }
        }
    }, [editMascota, store.user.mascotas]);

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
            
            ) : editMascota ? (
                <div className="container" id="contformagregar">
                        <form onSubmit={formik.handleSubmit}>

                            <div className="input-group mb-3">
                                <select 
                                    className="form-select border-0" 
                                    id="estado"
                                    name="estado" 
                                    value={formik.values.estado} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                <option value="">Estado</option>    
                                <option value="PERDIDO">PERDIDO</option>
                                <option value="ENCONTRADO">ENCONTRADO</option>
                                <option value="PERDIDO">ADOPCIÓN</option>
                                <option value="ENCONTRADO">REUNIDO</option>  
                                </select>
                                {formik.touched.estado && formik.errors.estado ? (
                                <div className="error-msg ms-2">{formik.errors.estado}</div>
                            ) : null}
                            </div>
                            

                            <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    // placeholder="Nombre de tu mascota" 
                                    placeholder={formik.values.estado === 'ENCONTRADO' ? "Título de la publicación" : "Nombre de tu mascota"}
                                    id="nombre"
                                    name="nombre" 
                                    value={formik.values.nombre} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.nombre && formik.errors.nombre ? (
                                <div className="error-msg ms-2">{formik.errors.nombre}</div>
                            ) : null}
                            </div>
                            <div className="input-group mb-3">
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    id="fecha_perdido"  
                                    name="fecha_perdido" 
                                    value={formik.values.fecha_perdido}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.fecha_perdido && formik.errors.fecha_perdido ? (
                                <div className="error-msg ms-2">{formik.errors.fecha_perdido}</div>
                            ) : null}
                            </div>
                            <div className="input-group mb-3">
                                <select 
                                    className="form-select border-0" 
                                    id="sexo"
                                    name="sexo" 
                                    value={formik.values.sexo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Sexo</option>
                                    <option value="HEMBRA">HEMBRA</option>
                                    <option value="MACHO">MACHO</option> 
                                    <option value="INDEFINIDO">INDEFINIDO</option>  
                                </select>
                                {formik.touched.sexo && formik.errors.sexo ? (
                                <div className="error-msg ms-2">{formik.errors.sexo}</div>
                            ) : null}
                            </div>
                            <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Edad de tu mascota" 
                                    id="edad"
                                    name="edad" 
                                    value={formik.values.edad} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.edad && formik.errors.edad ? (
                                <div className="error-msg ms-2">{formik.errors.edad}</div>
                            ) : null}
                            </div>

                            <div className="input-group mb-3">
                                <select 
                                    className="form-select border-0" 
                                    id="especie_id"
                                    name="especie_id" 
                                    value={formik.values.especie_id} 
                                    onChange={e => {
                                        const { value } = e.target;
                                        formik.handleChange(e);
                                        setEspecieSelected(value);
                                    }}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Especies</option>
                                    {store.especies.map((especie, index) => (
                                        <option key={index} value={especie.id}>
                                            {especie.name}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.especie_id && formik.errors.especie_id ? (
                                        <div className="error-msg ms-2">{formik.errors.especie_id}</div>
                                    ) : null}
                            </div>

                            {especieSelected && (
                                <>
                                
                                    <div className="input-group mb-3">
                                        <select
                                            className="form-select border-0"
                                            id="raza_id"
                                            name="raza_id"
                                            value={formik.values.raza_id}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option value="">Raza</option>
                                            {filteredRazas.map((raza, index) => (
                                                <option key={index} value={raza.id}>
                                                    {raza.name}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.touched.raza_id && formik.errors.raza_id ? (
                                        <div className="error-msg ms-2">{formik.errors.raza_id}</div>
                                    ) : null}
                                    </div>
                                </>
                            )}

                            <div className="input-group mb-3">
                                <textarea 
                                    className="form-control border-0" 
                                    placeholder="Agrega una descripción de tu mascota. Todos los detalles son importantes para poder identificarla" 
                                    id="descripcion"
                                    name="descripcion" 
                                    value={formik.values.descripcion} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{ height: '150px', resize: 'vertical' }}
                                ></textarea>
                                {formik.touched.descripcion && formik.errors.descripcion ? (
                                        <div className="error-msg ms-2">{formik.errors.descripcion}</div>
                                    ) : null}
                            </div>
                           
                            <div className="input-group mb-3">
                                <label className="form-label mx-2">Imagen</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="imagen"
                                    name="imagen"
                                    accept="image/*"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                />
                                
                            </div>
                            <div className="input-group mb-3">
                                <select 
                                    className="form-select border-0" 
                                    id="departamento_id"
                                    name="departamento_id" 
                                    value={formik.values.departamento_id} 
                                    onChange={e => {
                                        const { value } = e.target;
                                        formik.handleChange(e); // Actualiza el valor en Formik
                                        setDepartamentoSelected(value); // Actualiza el estado del departamento
                                    }}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Departamento</option>
                                    {store.departamentos.map((departamento, index) => (
                                        <option key={index} value={departamento.id}>
                                            {departamento.name}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.departamento_id && formik.errors.departamento_id ? (
                                        <div className="error-msg ms-2">{formik.errors.departamento_id}</div>
                                    ) : null}
                            </div>
                            {departamentoSelected && (
                                <>
                                
                                    <div className="input-group mb-3">
                                        <select
                                            className="form-select border-0"
                                            id="localidad_id"
                                            name="localidad_id"
                                            value={formik.values.localidad_id}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option value="">Localidad</option>
                                            {filteredLocalidades.map((localidad, index) => (
                                                <option key={index} value={localidad.id}>
                                                    {localidad.name}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.touched.localidad_id && formik.errors.localidad_id ? (
                                        <div className="error-msg ms-2">{formik.errors.localidad_id}</div>
                                    ) : null}
                                    </div>
                                </>
                            )}
                           
                            <button type="submit" id="botonEnviar">Enviar</button>
                        </form>
                    </div>

            ) : (
                <div>
                    <h1 className="text-center">Bienvenido/a {store.user.nombre}</h1>
                    <h6 className="text-center mt-5">Email: {store.user.email}</h6>
                    <h6 className="text-center">Nombre: {store.user.nombre}</h6>
                    <h6 className="text-center">Telefono: {store.user.telefono}</h6>
                    <h6 className="text-center">Contraseña: {store.user.password}</h6>
                    <h6 className="text-center">Mis mascotas:</h6> 
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => setEdit(true)}><i className="fas fa-edit"></i></button>
                        <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => setEditPassword(true)}><i className="fas fa-edit"></i>Cambiar contraseña</button>
                    </div>
                    {/* <div className="mt-5">
                        <h2>Tus Mascotas</h2>
                        <div className="row"> */}
                        <div className="container mt-5 text-center vh-100">
                            <h1>Mis mascotas:</h1>
                            <div className="mt-5">
                                <div className="accordion accordion-flush" id="accordionFlushExample">

                            {store.user.mascotas && store.user.mascotas.length > 0 ? (
                                store.user.mascotas.map((mascota, index) => (
                                    <div key={index} className="">
                                        <MiMascotaCard 
                                        mascota={mascota} 
                                        imgSrc={mascota.url_image}
                                        nombre={mascota.nombre}
                                        fechaPer={mascota.fecha_perdido}
                                        // especie={mascota.especie_name}
                                        // localidad={mascota.localidad_name}
                                        edad={mascota.edad}
                                        estado={mascota.estado}
                                        descripcion={mascota.descripción}
                                        fechaReg={mascota.fecha_registro}
                                        id={mascota.id}
                                        />
                                    </div>
))
                            ) : (
                                <p>No tienes mascotas registradas.</p>
                            )}</div></div>
                        </div>
                </div>
            )}
        </div>
    );
};

export default PerfilMock;