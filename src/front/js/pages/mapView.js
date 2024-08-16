import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { MapComp } from "../component/mapComp.js";


const MapView = () => {
    const { store } = useContext(Context)

    //filtro para mostrar únicamente mascotas con estado: Perdido o Encontrado
    const mascotasPerdidasEncontradas = store.mascotas.filter(mascota => mascota.estado === 'PERDIDO' || mascota.estado === 'ENCONTRADO');
    console.log(mascotasPerdidasEncontradas);
    
    
    return (
        
        <div className="container">
            <div className="title text-center mt-5">
                <h1>Bienvenido a la vista de Mapa</h1>
            </div>
            <div className="description text-center mt-4">
                <p>Hola! Aquí podrás ver un mapa con la ubicacion de las mascotas perdidas y encontradas.</p>
                <p>Si has visto alguna de estas mascotas, por favor, no dudes en contactarnos para ayudar a reunirlas con sus familias.</p>
            </div>
            {/* Componente MapaComp al cual le paso la lista de mascotas perdidas y encontradas ya filtradas */}
            <MapComp
            //  lista={mascotasPerdidasEncontradas} 
             />

        </div>
    );
}

export default MapView;
