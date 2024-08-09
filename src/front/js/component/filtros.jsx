import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import MascotaCard from "./mascotaCard.jsx";


const Filtros = (props) => {
    const { store } = useContext(Context)
    const [especieSelected, setEspecieSelected] = useState("");
    const [localidadSelected, setLocalidadSelected] = useState("");
    const [especieArray, setEspecieArray] = useState([]);
    
    //si hay cambios en especieSelected, se filtra la lista de mascotas perdidas por el valor de especieSelected
    useEffect(()=> {
        let filteredMascotas = props.lista;
        
        if (especieSelected) {
            filteredMascotas = filteredMascotas.filter(
            mascota => mascota.especie_name == especieSelected);
        } 
        if (localidadSelected) {
            filteredMascotas = filteredMascotas.filter(
                mascota => mascota.localidad_name == localidadSelected
            );
        }
        
        setEspecieArray(filteredMascotas);

    },[especieSelected, localidadSelected, props.lista])

    //metodo del onChange que setea el value del select a especieSelected (Perro o Gato en este caso)
    const handleSpeciesChange = (e) => {
        setEspecieSelected(e.target.value);
    };

    const handleLocalidadChange = (e) => {
        setLocalidadSelected(e.target.value);
    };

    // console.log(store.mascotas)
    return(
        <div className="container">

            <div className="row mt-4">
                <div className="col-3 d-flex">
                    
                    {/* Select donde se despliegan las opciones que se encuentran en store.especies */}
                    <select 
                        className="form-select" 
                        aria-label="Default select example" 
                        value={especieSelected} 
                        onChange={handleSpeciesChange}>

                        {/*     map de las opciones extraídas en especies     */}
                        <option value="">Seleccione una especie</option>
                        {store.especies.map((especie, index) => (
                            <option key={index} value={especie}>
                                {especie}
                            </option>
                        ))}
                    </select>

                </div>

                <div className="col-3 d-flex">
                <select
                    className="form-select"
                    aria-label="Default select example"
                    value={localidadSelected}
                    onChange={handleLocalidadChange}
                >
                    <option value="">Seleccione una localidad</option>
                    {store.localidades.map((localidad, index) => (
                        <option key={index} value={localidad}>
                            {localidad}
                        </option>
                    ))}
                </select>
            </div>

            </div>
            
            {/* Aca se mapea el grid de mascotas, donde se aplica el condicional si el value del select está vacío,
            se muestran todas las mascotas pedidas, y si se selecciona un valor, se filtra las especies por el value
            seleccionado */}
            <div className="row d-flex justify-content-center gx-5">
            {especieArray.map((mascota, index) => (
                <div key={index} className="col-md-6 col-sm-12 col-lg-4 col-xxl-3 mb-4">
                    <MascotaCard
                        imgSrc={"https://picsum.photos/200"}
                        nombre={mascota.nombre}
                        fecha={mascota.fecha_perdido}
                        especie={mascota.especie_name}
                        localidad={mascota.localidad_name}
                    />
                </div>
            ))}
        </div> 
            
        </div>
    );
}

export default Filtros