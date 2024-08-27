import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import GridMascotas from "../component/gridMascotas.jsx";

const MascotasAdopcion = () => {
    const { store } = useContext(Context);
    const [mascotasAdopcion, setMascotasAdopcion] = useState([]);

    useEffect(() => {
        console.log("store.mascotas:", store.mascotas);
        const filterMascotas = store.mascotas.filter(mascota => mascota.estado === "ADOPCION");
        setMascotasAdopcion(filterMascotas);
    }, [store.mascotas]);

    return (
        <div className="container mt-5">
            <GridMascotas lista={mascotasAdopcion}/>
          
        </div>
    );
}
export default MascotasAdopcion;