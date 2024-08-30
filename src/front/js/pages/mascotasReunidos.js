import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import logoOscuro from "../../img/logo-mascotapp_oscuro.gif"
import { Link } from "react-router-dom";
import GridMascotas from "../component/gridMascotas.jsx";

const MascotasReunidos = () => {
    const { store } = useContext(Context);

    const filterMascotasReunidas = store.mascotas.filter(mascota => mascota.estado === "REUNIDO");


    return (
        <div className="container">
        {filterMascotasReunidas.length === 0 ? (
            <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={logoOscuro} style={{ maxWidth: "70px", maxHeight: "70px" }} alt="Logo" />
            </div>
        ) : (
        <>
        <div className="title text-center mt-5">
                        <h1>Mascotas reunidas</h1>
                    </div>
                    <div className="description text-center mt-4">
                        <p>¡Bienvenidos a la sección más feliz de nuestra página! Aquí celebramos los reencuentros de nuestras queridas mascotas con sus familias. Cada historia es un testimonio del amor incondicional y la esperanza, recordándonos que los finales felices son posibles. Nos alegra ser parte de estos momentos tan especiales y agradecemos a todos los que colaboran para que más mascotas regresen a casa. ¡Gracias por ser parte de esta comunidad que valora a nuestros compañeros peludos!</p>
                 
                    </div>


       
        <GridMascotas lista={filterMascotasReunidas} />
        </>
        )}

    </div>
    );
}
export default MascotasReunidos;