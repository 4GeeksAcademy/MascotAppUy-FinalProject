import React, {useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext.js";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";

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

    const [departamentoSelected, setDepartamentoSelected] = useState("");
    const [filteredLocalidades, setFilteredLocalidades] = useState([]);

    const [especieSelected, setEspecieSelected] = useState("");
    const [filteredRazas, setFilteredRazas] = useState([]);

    const nav = useNavigate();

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
            console.log("Raza Filtradas:"+ filterRaza);
            
        } else {
            setFilteredRazas(store.razas)
        }

    }, [especieSelected, store.razas])

    //tengo que hacer la logica para que cuando selecciono un departamento, se muestre la elección de la localidad
    //descripción no está tomando el valor

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };
    
    const formik = useFormik({
        initialValues: {
          estado: '',
          nombre: '',
          edad: '',
          sexo: '',
          especie_id: '',
          raza_id: '',
          descripcion: '',
          fecha_perdido: '',
          contacto: '',
          departamento_id: '',
          localidad_id: ''
        },
        validate,
        onSubmit: async (values) => {

            const formattedValues = {
                ...values,
                fecha_perdido: formatDate(values.fecha_perdido),
                user_id: store.user.id 
            };
    
            await actions.agregarMascota(formattedValues);
            
            nav("/")
        }
      });

 
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
                                <option value="PERDIDO">PERDIDO</option>
                                <option value="ENCONTRADO">ENCONTRADO</option>  
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
                                <label className="text-secondary" htmlFor="fecha_perdido">¿Cuando se perdió su mascota?</label>
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
                                    <option value="HEMBRA">HEMBRA</option>
                                    <option value="MACHO">MACHO</option> 
                                    <option value="INDEFINIDO">INDEFINIDO</option>  
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


                            <label htmlFor="especie_id" className="text-secondary">
                                Especie:
                            </label>
                            <div className="input-group mb-3">
                                <select 
                                    className="form-select" 
                                    id="especie_id"
                                    name="especie_id" 
                                    value={formik.values.especie_id} 
                                    onChange={e => {
                                        const { value } = e.target;
                                        formik.handleChange(e); 
                                        setEspecieSelected(value); 
                                    }}
                                >
                                    <option value="">Especies</option>
                                    {store.especies.map((especie, index) => (
                                        <option key={index} value={especie.id}>
                                            {especie.name}
                                        </option>
                                    ))}
                                
                                </select>
                            </div>
                            {especieSelected && (
                                <>
                                    <label htmlFor="raza_id" className="text-secondary">
                                        Seleccione la raza de la mascota
                                    </label>
                                    <div className="input-group mb-3">
                                        <select
                                            className="form-select"
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
                                    </div>
                                </>
                            )}



                            <div className="input-group mb-3">
                                <label className="text-secondary" htmlFor="descripcion">Descripción:</label>
                                <textarea 
                                    className="form-control" 
                                    placeholder="Agrega aquí una descripción de tu mascota. Todos los detalles son importantes para poder identificarla" 
                                    id="descripcion"
                                    name="descripcion" 
                                    value={formik.values.descripcion} 
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
                            <label htmlFor="departamento_id" className="text-secondary">
                                Seleccione el departamento donde se perdió su mascota:
                            </label>
                            <div className="input-group mb-3">
                                <select 
                                    className="form-select" 
                                    id="departamento_id"
                                    name="departamento_id" 
                                    value={formik.values.departamento_id} 
                                    onChange={e => {
                                        const { value } = e.target;
                                        formik.handleChange(e); // Actualiza el valor en Formik
                                        setDepartamentoSelected(value); // Actualiza el estado del departamento
                                    }}
                                >
                                    <option value="">Departamento</option>
                                    {store.departamentos.map((departamento, index) => (
                                        <option key={index} value={departamento.id}>
                                            {departamento.name}
                                        </option>
                                    ))}
                                
                                </select>
                            </div>
                            {departamentoSelected && (
                                <>
                                    <label htmlFor="localidad_id" className="text-secondary">
                                        Seleccione la localidad donde se perdió su mascota:
                                    </label>
                                    <div className="input-group mb-3">
                                        <select
                                            className="form-select"
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
                                    </div>
                                </>
                            )}
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