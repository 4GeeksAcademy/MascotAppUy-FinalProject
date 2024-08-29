import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import logoOscuro from "../../img/logo-mascotapp_oscuro.gif"
import { Link } from "react-router-dom";
import GridMascotas from "../component/gridMascotas.jsx";

const MascotasReunidos = () => {
    const { store } = useContext(Context);

    const filterMascotasReunidas = store.mascotas.filter(mascota => mascota.estado === "REUNIDO");


    return (
        <div className="container" style={{ minHeight: "100vh"}}>
        {filterMascotasReunidas.length === 0 ? (
            <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={logoOscuro} style={{ maxWidth: "70px", maxHeight: "70px" }} alt="Logo" />
            </div>
        ) : (
        <>
        <div className="title text-center mt-5">
            <h1>Mascotas reunidas con sus familias</h1>
            <p>En esta sección podrás encontrar mascotas que estaban perdidas y se reencontraron con sus familias</p>
        </div>


       
        <GridMascotas lista={filterMascotasReunidas} />
        </>
        )}

    </div>
    );
}
export default MascotasReunidos;