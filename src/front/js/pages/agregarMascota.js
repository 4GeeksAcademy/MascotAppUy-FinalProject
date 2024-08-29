import React, {useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext.js";
import { Formik, useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import "../../styles/formularios.css"
import Swal from 'sweetalert2'
import { MapComp } from "../component/mapComp.js";
import "../../styles/agregarMascota.css"


const validate = values => {
    const errors = {};
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
    
    
    if (!values.edad) {
        errors.edad = 'Requerido';
    }

    


    if (!values.departamento_id) {
        errors.departamento_id = 'Requerido';
    }
    if (!values.localidad_id) {
        errors.localidad_id = 'Requerido';
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

export const AgregarMascota = () =>{
    const { store, actions } = useContext(Context);
    //console.log(store.user);

    const [departamentoSelected, setDepartamentoSelected] = useState("");
    const [filteredLocalidades, setFilteredLocalidades] = useState([]);

    const [localidadSelected, setLocalidadSelected] = useState("")

    const [especieSelected, setEspecieSelected] = useState("");
    const [filteredRazas, setFilteredRazas] = useState([]);

    const nav = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);

    const selectedDepartmentCoords = store.departamentos.find(depto => depto.id === parseInt(departamentoSelected));
    const selectedLocalityCoords = store.localidades.find(loc => loc.id === parseInt(localidadSelected))

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

    // useEffect(() => {
    // }, [localidadSelected]);

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
          departamento_id: '',
          localidad_id: ''
        },
        validate,
        onSubmit: async (values) => {

            let formData = null;
            if (selectedFile) {
                formData = new FormData();
                formData.append('file', selectedFile);
                // console.log(formData);
                
            }

            // Subir la imagen
            const urlImg = formData ? await actions.uploadImage(formData) : null;
            console.log(urlImg);
            

            const formattedValues = {
                ...values,
                // fecha_perdido: formatDate(values.fecha_perdido), coords
                user_id: store.user.id,
                url_image: urlImg,
                coord_x: store.coord_x,
                coord_y: store.coord_y
            };
            console.log(formattedValues);
            
            const added = await actions.agregarMascota(formattedValues);
            if (added) {
                Toast.fire({
                icon: "success",
                title: "Mascota agregada correctamente"
                });
                nav("/")
            }else {
                Toast.fire({
                icon: "error",
                title: "Error al agregar mascota",
                showConfirmButton: false,
                });
            }
            }

            
            
        }
      );

 
    return(
        <>
            {store.user ? (
                <>
                    
                    <div className="container">
                        <h2 className="mt-5" style={{ textAlign: "center" }}>
                            Completa el formulario para agregar una mascota
                        </h2>
                        
                        <div className="d-flex justify-content-center">
                        <form className="agregar-mascota mt-5 w-75" onSubmit={formik.handleSubmit}>
                            <div className="row">
                                
                        {/* PRIMERA PARTE FORMULARIO */}    
                            <div className="col-12 col-md-6">
                                <div className="input-group input-group-sm">
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
                                        <option value="ADOPCION">ADOPCIÓN</option>
                                        <option value="REUNIDO">REUNIDO</option>  
                                    </select>
                                    {formik.touched.estado && formik.errors.estado ? (
                                        <div className="error-msg ms-2">{formik.errors.estado}</div>
                                    ) : null}
                            </div>
                               
                            
                                <div className="row">

                                {/* Primera parte izquierda */}
                                    {/* nombre */}
                                    <div className="col-12 col-md-6">
                                        <div className="input-group input-group-sm">
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

                                        {/* sexo */}
                                        <div className="input-group input-group-sm">
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

                                    </div>
                                    
                                    {/* Primera parte derecha */}
                                    
                                    <div className="col-12 col-md-6">
                                        {/* fecha perdido */}
                                        <div className="input-group input-group-sm">
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
                                        
                                        {/* edad */}
                                        <div className="input-group input-group-sm">
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

                                    </div>

                                </div>
                            
                                <div className="input-group input-group-sm">
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
                                    
                                    <div className="input-group input-group-sm">
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
                                    
                                )}

                                    <div className="input-group input-group-sm">
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
                            </div>

                        {/* SEGUNDA COLUMNA PARA MAPA */}
                            <div className="col-12 col-md-6">

                                <div className="input-group input-group-sm">
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

                                <div className="input-group input-group-sm">
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
                                   
                                    
                                   <div className="input-group input-group-sm">
                                       <select
                                           className="form-select border-0"
                                           id="localidad_id"
                                           name="localidad_id"
                                           value={formik.values.localidad_id}
                                           onChange={e => {
                                               const { value } = e.target;
                                               formik.handleChange(e); // Actualiza el valor en Formik
                                               setLocalidadSelected(value); // Actualiza el estado de la localidad
                                           }}
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
                               
                                   )}

                                <div id="emailHelp" className="form-text mb-1">Puedes marcar la localizacion exacta en el mapa antes de ENVIAR</div>
                                <MapComp selectedDepartmentCoords={selectedDepartmentCoords} selectedLocalityCoords={selectedLocalityCoords} mapHeight={"300px"} mapWidth={"100%"} mapZoom={6} />
                                
                                <button type="submit" className="btn enviar w-100 mt-2">
                                    ENVIAR
                                </button>
                            </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    
                </>
            ) : (
                <div className="d-flex text-center text-danger">Debes estar logueado para publicar.</div>
            )}
        </>
    );
}