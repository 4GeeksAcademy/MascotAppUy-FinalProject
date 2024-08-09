import React, { useContext, useState } from "react";

import { Context } from "../store/appContext.js";

import GridMascotas from "../component/gridMascotas.jsx";

const AllMascotasPerdidas = () => {
    const { store } = useContext(Context)
    
    console.log(store.mascotas)
    
    
    //filtro para mostrar únicamente mascotas con estado: Perdido
    const mascotasPerdidas = store.mascotas.filter(mascota => mascota.estado == 'PERDIDO');
    console.log(mascotasPerdidas);
    
    
    return (
        
        <div className="container">

            {/* Componente GridMascotas al cual le paso la lista de mascotas perdidas ya filtradas */}
            <GridMascotas mascotasPerdidas={mascotasPerdidas} />

        </div>
    );
}

export default AllMascotasPerdidas;