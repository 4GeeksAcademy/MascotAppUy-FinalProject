import React, {useState, useContext} from "react";
import { Context } from "../store/appContext.js";

export const AgregarMascota = () =>{
    const { store } = useContext(Context);
    console.log(store.user);
     
    const[formAMData, setFormAMData] = useState({
        estado: "",
        nombre: "",
        fecha: "",
        edad: "",
        descripcion: "",
        contacto: "",
        departamento: "",
        localidad: "",
        archivo: null
    });
    
    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormAMData({
            ...formAMData,
            [id]: files ? files[0] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefautl();
    }

 
    return(
        <>
            {store.user ? (
                <>
                    <h2 className="mt-5" style={{ textAlign: "center" }}>
                        Completá el siguiente formulario para agregar una mascota:
                    </h2>
                    <div className="container-fluid" id="contformagregar">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <select 
                                    className="form-select" 
                                    id="estado" 
                                    value={formAMData.estado} 
                                    onChange={handleChange}
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
                                    value={formAMData.nombre} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <label className="text-secondary" htmlFor="fecha">¿Cuando se perdió su mascota?</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    id="fecha" 
                                    value={formAMData.fecha} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <select 
                                    className="form-select" 
                                    id="sexo" 
                                    value={formAMData.sexo} 
                                    onChange={handleChange}
                                >
                                    <option value="">Sexo</option>
                                    <option value="1">Hembra</option>
                                    <option value="2">Macho</option>  
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <label className="text-secondary" htmlFor="edad">Edad:</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Edad de tu mascota" 
                                    id="edad" 
                                    value={formAMData.edad} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <label className="text-secondary" htmlFor="descripcion">Descripción:</label>
                                <textarea 
                                    className="form-control" 
                                    placeholder="Agrega aquí una descripción de tu mascota. Todos los detalles son importantes para poder identificarla" 
                                    id="descripcion" 
                                    value={formAMData.descripcion} 
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <label>Contacto</label><br />
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
                            </div>
                            <label htmlFor="departamento" className="text-secondary">
                                Seleccione el departamento donde se perdió su mascota:
                            </label>
                            <div className="input-group mb-3">
                                <select 
                                    className="form-select" 
                                    id="departamento" 
                                    value={formAMData.departamento} 
                                    onChange={handleChange}
                                >
                                    <option value="">Departamento</option>
                                    <option value="1">Artigas</option>
                                    <option value="2">Cerro Largo</option>
                                    <option value="3">Durazno</option>
                                </select>
                            </div>
                            <label htmlFor="localidad" className="text-secondary">
                                Seleccione la localidad donde se perdió su mascota:
                            </label>
                            <div className="input-group mb-3">
                                <select 
                                    className="form-select" 
                                    id="localidad" 
                                    value={formAMData.localidad} 
                                    onChange={handleChange}
                                >
                                    <option value="">Localidad</option>
                                    <option value="1">Artigas</option>
                                    <option value="2">Bella Unión</option>
                                    <option value="3">Gomensoro</option>
                                </select>
                            </div>
                            <label htmlFor="archivo" className="text-secondary">Subir imágen</label>
                            <div className="input-group mb-3">
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    id="archivo" 
                                    onChange={handleChange}
                                />
                            </div>
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