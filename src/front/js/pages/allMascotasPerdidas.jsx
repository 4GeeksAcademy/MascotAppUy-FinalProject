import React, { useContext, useState } from "react";
import logoOscuro from "../../img/logo-mascotapp_oscuro.gif"
import { Context } from "../store/appContext.js";
import GridMascotas from "../component/gridMascotas.jsx";

const AllMascotasPerdidas = () => {
    const { store } = useContext(Context)
    
    // console.log(store.mascotas)
    
    
    //filtro para mostrar únicamente mascotas con estado: Perdido
    const mascotasPerdidas = store.mascotas.filter(mascota => mascota.estado == 'PERDIDO');
    // console.log(mascotasPerdidas);
    
    
    return (
        <div className="container" style={{ minHeight: "100vh"}}>
            {mascotasPerdidas.length === 0 ? (
                <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src={logoOscuro} style={{ maxWidth: "70px", maxHeight: "70px" }} alt="Logo" />
                </div>
            ) : (
            <>
            <div className="title text-center mt-5">
                <h1>Mascotas Perdidas</h1>
            </div>
            <div className="description text-center mt-4">
                <p>Bienvenido a nuestra sección de mascotas perdidas. Aquí podrás ver una lista de animales que están siendo buscados por sus dueños.</p>
                <p>Si has visto alguna de estas mascotas, por favor, no dudes en contactarnos para ayudar a reunirlas con sus familias.</p>
            </div>

            {/* Componente GridMascotas al cual le paso la lista de mascotas perdidas ya filtradas */}
            <GridMascotas lista={mascotasPerdidas} />
            </>
            )}

        </div>
    );
}

export default AllMascotasPerdidas;
