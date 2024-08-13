import React, {useState, useContext} from "react";
import { Context } from "../store/appContext.js";
import { useFormik } from 'formik';

const validate = values => {
    const errors = {};
    if (!values.estado) {
      errors.estado = 'Required';
    }
  
    if (!values.nombre) {
      errors.nombre = 'Required';
    } else if (values.nombre.length > 120) {
      errors.nombre = 'Must be 120 characters or less';
    }

    if (!values.fecha_perdido) {
        errors.fecha_perdido = 'Fecha es requerida';
    }
    if (!values.sexo) {
        errors.sexo = 'Sexo es requerido';
    }
  
    
  
    return errors;
  };

export const AgregarMascota = () =>{
    const { store, actions } = useContext(Context);
    console.log(store.user);
    const userId = store.user;

    //tengo que hacer la logica para que cuando selecciono un departamento, se muestre la elección de la localidad
    //descripción no está tomando el valor

    const formik = useFormik({
        initialValues: {
          estado: '',
          nombre: '',
          edad: '',
          sexo: '',
          descricion: '',
          fecha_perdido: '',
          contacto: '',
          departamento: '',
          localidad: '',
          user_id: userId
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

     
    // const[formAMData, setFormAMData] = useState({
    //     estado: "",
    //     nombre: "",
    //     fecha: "",
    //     edad: "",
    //     descripcion: "",
    //     contacto: "",
    //     departamento: "",
    //     localidad: "",
    //     archivo: null
    // });
    
    // const handleChange = (e) => {
    //     const { id, value, files } = e.target;
    //     setFormAMData({
    //         ...formAMData,
    //         [id]: files ? files[0] : value
    //     });
    //     console.log(formAMData.estado);
        
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     const userId = store.user.id;
    //     // Crear un FormData para enviar los datos
    //     const dataToSend = new FormData();
    //     dataToSend.append("estado", formAMData.estado);
    //     dataToSend.append("nombre", formAMData.nombre);
    //     dataToSend.append("fecha_perdido", formAMData.fecha); // Cambiado para que coincida con el backend
    //     dataToSend.append("sexo", formAMData.sexo);
    //     dataToSend.append("edad", formAMData.edad);
    //     dataToSend.append("descripcion", formAMData.descripcion);
    //     dataToSend.append("contacto", formAMData.contacto);
    //     dataToSend.append("departamento_id", formAMData.departamento); // Cambiado para que coincida con el backend
    //     dataToSend.append("localidad_id", formAMData.localidad);
    //     dataToSend.append("user_id", userId); // Cambiado para que coincida con el backend
    //     if (formAMData.archivo) {
    //         dataToSend.append("archivo", formAMData.archivo);
    //     }
        
    //     // Llamar a la acción de flux
    //     const result = await actions.agregarMascota(dataToSend);
        
    //     if (result) {
    //         console.log("Formulario enviado correctamente");
    //     } else {
    //         console.log("Error al enviar el formulario");
    //     }
    // }

 
    return(
        <>
            {store.user ? (
                <>
                    <h2 className="mt-5" style={{ textAlign: "center" }}>
                        Completá el siguiente formulario para agregar una mascota:
                    </h2>
                    <div className="container-fluid" id="contformagregar">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="input-group mb-3">
                                <select 
                                    className="form-select" 
                                    id="estado" 
                                    value={formik.values.estado} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                <option value="">Estado</option>    
                                <option value="1">Perdido</option>
                                <option value="2">Encontrado</option>  
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <label className="text-secondary" htmlFor="nombre">Nombre:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre de tu mascota" 
                                    id="nombre" 
                                    value={formik.values.nombre} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <label className="text-secondary" htmlFor="fecha">¿Cuando se perdió su mascota?</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    id="fecha_perdido"  
                                    name="fecha_perdido" 
                                    value={formik.values.fecha_perdido}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <select 
                                    className="form-select" 
                                    id="sexo"
                                    name="sexo" 
                                    value={formik.values.sexo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Sexo</option>
                                    <option value="1">HEMBRA</option>
                                    <option value="2">MACHO</option> 
                                    <option value="2">INDEFINIDO</option>  
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <label className="text-secondary" htmlFor="edad">Edad:</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Edad de tu mascota" 
                                    id="edad"
                                    name="edad" 
                                    value={formik.values.edad} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <label className="text-secondary" htmlFor="descripcion">Descripción:</label>
                                <textarea 
                                    className="form-control" 
                                    placeholder="Agrega aquí una descripción de tu mascota. Todos los detalles son importantes para poder identificarla" 
                                    id="descripcion"
                                    name="descripcion" 
                                    value={formik.values.descricion} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                ></textarea>
                            </div>
                            {/* <label>Contacto</label><br />
                            <label className="text-secondary py-2">
                                Garantizamos la seguridad de tus datos personales. Tus datos serán compartidos únicamente con usuarios registrados en nuestra web solo si informan haber encontrado a tu mascota.
                            </label>
                            <div className="input-group mb-3">
                                <input 
                                    type="tel" 
                                    className="form-control" 
                                    placeholder="Ingrese aquí su número de contacto" 
                                    id="contacto" 
                                    value={formAMData.contacto} 
                                    onChange={handleChange}
                                />
                            </div> */}
                            <label htmlFor="departamento" className="text-secondary">
                                Seleccione el departamento donde se perdió su mascota:
                            </label>
                            <div className="input-group mb-3">
                                <select 
                                    className="form-select" 
                                    id="departamento"
                                    name="departamento" 
                                    value={formik.values.departamento} 
                                    onChange={formik.handleChange}
                                >
                                    <option value="">Departamento</option>
                                    {store.departamentos.map((departamento, index) => (
                                        <option key={index} value={departamento.id}>
                                            {departamento.name}
                                        </option>
                                    ))}
                                
                                </select>
                            </div>
                            <label htmlFor="localidad" className="text-secondary">
                                Seleccione la localidad donde se perdió su mascota:
                            </label>
                            <div className="input-group mb-3">
                                <select 
                                    className="form-select" 
                                    id="localidad" 
                                    value={formik.values.localidad} 
                                    onChange={formik.handleChange}
                                >
                                    <option value="">Localidad</option>
                                    <option value="1">Artigas</option>
                                    <option value="2">Bella Unión</option>
                                    <option value="3">Gomensoro</option>
                                </select>
                            </div>
                            {/* <label htmlFor="archivo" className="text-secondary">Subir imágen</label>
                            <div className="input-group mb-3">
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    id="archivo" 
                                    onChange={handleChange}
                                />
                            </div> */}
                            <button type="submit" id="botonEnviar">Enviar</button>
                        </form>
                    </div>
                </>
            ) : (
                <div>No estas logueado</div>
            )}
        </>
    );
}