import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import GridMascotas from "../component/gridMascotas.jsx";

const MascotasAdopcion = () => {
    const { store } = useContext(Context);

    const filterMascotas = store.mascotas.filter(mascota => mascota.estado === "ADOPCION");

    return (
        <div className="container mt-5">
            <GridMascotas lista={filterMascotas}/>
          
        </div>
    );
}
export default MascotasAdopcion;