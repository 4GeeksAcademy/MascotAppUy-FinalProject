import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import GridMascotas from "../component/gridMascotas.jsx";

const MascotasReunidos = () => {
    const { store } = useContext(Context);

    const filterMascotasReunidas = store.mascotas.filter(mascota => mascota.estado === "REUNIDO");


    return (
        <div className="container mt-5">
            <GridMascotas lista={filterMascotasReunidas}/>
          
        </div>
    );
}
export default MascotasReunidos;