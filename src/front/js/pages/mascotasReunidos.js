import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import GridMascotas from "../component/gridMascotas.jsx";

const MascotasReunidos = () => {
    const { store } = useContext(Context);
    const [mascotasReunidos, setMascotasReunidos] = useState([]);

    useEffect(() => {
        console.log("store.mascotas:", store.mascotas);
        const filterMascotas = store.mascotas.filter(mascota => mascota.estado === "REUNIDO");
        setMascotasReunidos(filterMascotas);
    }, [store.mascotas]);

    return (
        <div className="container mt-5">
            <GridMascotas lista={mascotasReunidos}/>
          
        </div>
    );
}
export default MascotasReunidos;