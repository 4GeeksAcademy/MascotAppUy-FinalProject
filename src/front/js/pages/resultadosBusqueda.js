import React from "react";
import { useLocation } from "react-router-dom";
import GridMascotas from "../component/gridMascotas.jsx";
import { Busqueda } from "../component/busqueda.js";
import InputBuscar from "../component/inputBuscar.js";

const ResultadosBusqueda = () => {

    const location = useLocation();
    
    // Extrae los resultados del estado de la ubicación
    const results = location.state?.results || [];

    return (
        <div className="container">
            <div className="mt-5">
                <InputBuscar/>
            </div>
            

            <GridMascotas lista={results}/>
        </div>
    );
}

export default ResultadosBusqueda;