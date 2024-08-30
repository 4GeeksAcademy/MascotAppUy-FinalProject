import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import logoOscuro from "../../img/logo-mascotapp_oscuro.gif"
import GridMascotas from "../component/gridMascotas.jsx";

const MascotasAdopcion = () => {
    const { store } = useContext(Context);

    const filterMascotas = store.mascotas.filter(mascota => mascota.estado === "ADOPCION");

    return (
        <div className="container">
        {filterMascotas.length === 0 ? (
            <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={logoOscuro} style={{ maxWidth: "70px", maxHeight: "70px" }} alt="Logo" />
            </div>
        ) : (
        <>
        <div className="title text-center mt-5">
            <h1>Mascotas en adopción</h1>
        </div>
        <div className="description text-center mt-4">
            <p>¡Bienvenidos a la sección de adopciones, donde los nuevos comienzos esperan! Aquí encontrarás a adorables mascotas que buscan un hogar lleno de amor y cuidado. Cada uno de estos peludos amigos está listo para brindarte lealtad y compañía incondicional. Adoptar es una oportunidad para cambiar una vida, y también para llenar tu hogar de alegría. Gracias por considerar la adopción y ser parte de esta noble misión de dar una segunda oportunidad a quienes más lo necesitan. ¡Juntos podemos hacer una gran diferencia!</p>
        </div>

        <GridMascotas lista={filterMascotas}/>
        </>
        )}

    </div>
);
}
export default MascotasAdopcion;