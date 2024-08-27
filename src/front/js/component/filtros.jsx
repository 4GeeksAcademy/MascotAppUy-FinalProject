import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import MascotaCard from "./mascotaCard.jsx";
import "../../styles/filtros.css";

const Filtros = (props) => {
    const { store } = useContext(Context);

    // Estado para los filtros seleccionados
    const [especieSelected, setEspecieSelected] = useState("");
    const [razaSelected, setRazaSelected] = useState("");
    const [departamentoSelected, setDepartamentoSelected] = useState("");
    const [localidadSelected, setLocalidadSelected] = useState("");

    // Estado para las opciones de los filtros
    const [especiesUnicas, setEspeciesUnicas] = useState([]);
    const [razasUnicas, setRazasUnicas] = useState([]);
    const [departamentosUnicos, setDepartamentosUnicos] = useState([]);
    const [localidadesUnicas, setLocalidadesUnicas] = useState([]);

    // Estado para las mascotas filtradas
    const [filteredArray, setFilteredArray] = useState([]);

    // Función para aplicar todos los filtros
    const aplicarFiltros = (mascotas) => {
        return mascotas.filter(mascota => 
            (!especieSelected || mascota.especie_name === especieSelected) &&
            (!razaSelected || mascota.raza_name === razaSelected) &&
            (!departamentoSelected || mascota.departamento_name === departamentoSelected) &&
            (!localidadSelected || mascota.localidad_name === localidadSelected)
        );
    };

    // Función para resetear todos los filtros
    const resetFiltros = () => {
        setEspecieSelected("");
        setRazaSelected("");
        setDepartamentoSelected("");
        setLocalidadSelected("");
    };

    // Actualizar opciones de filtros y aplicar filtros
    useEffect(() => {
        const mascotas = props.lista;

        // Aplicar filtros
        let mascotasFiltradas = aplicarFiltros(mascotas);

        // Actualizar opciones de filtros
        setEspeciesUnicas([...new Set(mascotasFiltradas.map(m => m.especie_name))]);
        setRazasUnicas([...new Set(mascotasFiltradas.filter(m => !especieSelected || m.especie_name === especieSelected).map(m => m.raza_name))]);
        setDepartamentosUnicos([...new Set(mascotasFiltradas.map(m => m.departamento_name))]);
        setLocalidadesUnicas([...new Set(mascotasFiltradas.filter(m => !departamentoSelected || m.departamento_name === departamentoSelected).map(m => m.localidad_name))]);

        // Actualizar array filtrado
        setFilteredArray(mascotasFiltradas);

    }, [especieSelected, razaSelected, departamentoSelected, localidadSelected, props.lista]);

    // Manejo de cambios en los selects
    const handleSpeciesChange = (e) => {
        setEspecieSelected(e.target.value);
        setRazaSelected("");
    };

    const handleRazaChange = (e) => setRazaSelected(e.target.value);

    const handleDepartamentoChange = (e) => {
        setDepartamentoSelected(e.target.value);
        setLocalidadSelected("");
    };

    const handleLocalidadChange = (e) => setLocalidadSelected(e.target.value);

    return (
        <div className="container">
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
                                    <select 
                                        className="form-select" 
                                        aria-label="Default select example" 
                                        value={especieSelected} 
                                        onChange={handleSpeciesChange}>
                                        <option value="">Especie</option>
                                        {especiesUnicas.map((especie, index) => (
                                            <option key={index} value={especie}>
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
                                            {razasUnicas.map((raza, index) => (
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
                                        {departamentosUnicos.map((departamento, index) => (
                                            <option key={index} value={departamento}>
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
                                            {localidadesUnicas.map((localidad, index) => (
                                                <option key={index} value={localidad}>
                                                    {localidad}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                            {(especieSelected || departamentoSelected) && (
                                <div className="row mt-2">
                                    <div className="col-12">
                                        <button className="btn btn-secondary" onClick={resetFiltros}>
                                            Resetear Filtros
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row gx-5">
                {filteredArray.map((mascota, index) => (
                    <div key={index} className="col-md-6 col-sm-12 col-lg-4 col-xxl-3 mb-4 mt-4">
                        <MascotaCard
                            imgSrc={mascota.url_image}
                            nombre={mascota.nombre}
                            fecha={mascota.fecha_perdido}
                            especie={mascota.especie_name}
                            localidad={mascota.localidad_name}
                            id={mascota.id}
                            estado={mascota.estado}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filtros;