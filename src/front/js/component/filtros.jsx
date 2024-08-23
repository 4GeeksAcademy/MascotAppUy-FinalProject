import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import MascotaCard from "./mascotaCard.jsx";
import "../../styles/filtros.css"


const Filtros = (props) => {
    const { store } = useContext(Context)
    const [especieSelected, setEspecieSelected] = useState("");
    const [razaSelected, setRazaSelected] = useState("");
    const [filteredRazas, setFilteredRazas] = useState([]);
    const [departamentoSelected, setDepartamentoSelected] = useState("")
    const [localidadSelected, setLocalidadSelected] = useState("");
    const [filteredLocalidades, setFilteredLocalidades] = useState([]);
    const [filteredArray, setFilteredArray] = useState([]);
    
    useEffect(() => {

        if (departamentoSelected) {
            const filterLoc = [
                ...new Set(
                    props.lista
                        .filter(mascota => mascota.departamento_id === parseInt(departamentoSelected))
                        .map(mascota => mascota.localidad_name)
                )
            ];           
            // store.localidades.filter(localidad => 
            //     localidad.departamento_id === parseInt(departamentoSelected)
            //     //tuve que convertir en integer porque venía como string el departamento_id
            // );
            setFilteredLocalidades(filterLoc);
            
        } else {
            setFilteredLocalidades([...new Set(props.lista.map(mascota => mascota.localidad_name))]);
        }

    }, [departamentoSelected, props.lista]);

    useEffect(() => {
        if(especieSelected) {
            const filterRaza = [
                ...new Set(
                    props.lista
                        .filter(mascota => mascota.especie_id === parseInt(especieSelected))
                        .map(mascota => mascota.raza_name)
                )
            ];
            // store.razas.filter(raza => 
            //     raza.especie_id === parseInt(especieSelected)
            // );
            setFilteredRazas(filterRaza)
        } else {
            setFilteredRazas([...new Set(props.lista.map(mascota => mascota.raza_name))]);
        }

    }, [especieSelected, props.lista])

    //si hay cambios en especieSelected, se filtra la lista de mascotas perdidas por el valor de especieSelected
    useEffect(()=> {
        let filteredMascotas = props.lista;
        
        if (especieSelected) {
            filteredMascotas = filteredMascotas.filter(
            mascota => mascota.especie_id == especieSelected);
        }
        if (departamentoSelected) {
            filteredMascotas = filteredMascotas.filter(
            mascota => mascota.departamento_id == departamentoSelected);
        }

        if (localidadSelected) {
            filteredMascotas = filteredMascotas.filter(
                mascota => mascota.localidad_name === localidadSelected
            );
        }

        if (razaSelected) {
            filteredMascotas = filteredMascotas.filter(
                mascota => mascota.raza_name === razaSelected
            );
        }

        setFilteredArray(filteredMascotas);
    }, [especieSelected, localidadSelected, razaSelected, departamentoSelected, props.lista]);


    //metodo del onChange que setea el value del select a especieSelected (Perro o Gato en este caso)
    const handleSpeciesChange = (e) => {
        setEspecieSelected(e.target.value);
    };

    const handleLocalidadChange = (e) => {
        setLocalidadSelected(e.target.value);
    };

    const handleDepartamentoChange = (e) => {
        setDepartamentoSelected(e.target.value);
    };

    const handleRazaChange = (e) => {
        setRazaSelected(e.target.value);
    };

    // console.log(store.mascotas)
    return(
        <div className="container">

            {/* El filtro se enceuntra dentro de un accordion, para que se despliegue si el usuario quiere aplicar los filtros */}
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <div className="d-flex col-12 col-md-6 col-sm-12 mt-5">
                        <button className="accordion-button collapsed w-25 p-1" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Filtros
                        </button>
                    </div>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            
                            <div className="row mt-4">
                                <div className="col-12 col-md-6 col-lg-3 mb-3 d-flex">
                                    
                                    {/* Select donde se despliegan las opciones que se encuentran en store.especies */}
                                    <select 
                                        className="form-select" 
                                        aria-label="Default select example" 
                                        value={especieSelected} 
                                        onChange={handleSpeciesChange}>

                                        {/*     map de las opciones extraídas en especies     */}
                                        <option value="">Especie</option>
                                        {[...new Set(props.lista.map(mascota => mascota.especie_name))].map((especie, index) => (
                                            <option key={index} value={store.especies.find(e => e.name === especie)?.id}>
                                                {especie}
                                            </option>
                                        ))}
                                    </select>
                                </div>                         
                                {especieSelected && (
                                    <div className="col-12 col-md-6 col-lg-3 mb-3 d-flex">
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={razaSelected}
                                            onChange={handleRazaChange}
                                        >
                                            <option value="">Raza</option>
                                            {filteredRazas.map((raza, index) => (
                                                <option key={index} value={raza}>
                                                    {raza}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                
                                <div className="col-12 col-md-6 col-lg-3 mb-3 d-flex">
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        value={departamentoSelected}
                                        onChange={handleDepartamentoChange}
                                    >
                                        <option value="">Departamento</option>
                                        {[...new Set(props.lista.map(mascota => mascota.departamento_name))].map((departamento, index) => (
                                            <option key={index} value={store.departamentos.find(d => d.name === departamento)?.id}>
                                                {departamento}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                {departamentoSelected && (
                                    <div className="col-12 col-md-6 col-lg-3 mb-3 d-flex">
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        value={localidadSelected}
                                        onChange={handleLocalidadChange}
                                    >
                                        <option value="">Localidad</option>
                                            {filteredLocalidades.map((localidad, index) => (
                                                <option key={index} value={localidad}>
                                                    {localidad}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Aca se mapea el grid de mascotas, donde se aplica el condicional si el value del select está vacío,
            se muestran todas las mascotas pedidas, y si se selecciona un valor, se filtra las especies por el value
            seleccionado */}
            <div className="row gx-5">
            {filteredArray.map((mascota, index) => (
                <div key={index} className="col-md-6 col-sm-12 col-lg-4 col-xxl-3 mb-4">
                    <MascotaCard
                        imgSrc={mascota.url_image}
                        nombre={mascota.nombre}
                        fecha={mascota.fecha_perdido}
                        especie={mascota.especie_name}
                        localidad={mascota.localidad_name}
                        id= {mascota.id}
                        estado={mascota.estado}
                    />
                </div>
            ))}
        </div> 
            
        </div>
    );
}

export default Filtros
