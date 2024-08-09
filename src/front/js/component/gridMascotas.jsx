import React from "react";
import MascotaCard from "../component/mascotaCard.jsx";
import Filtros from "../component/filtros.jsx";

const GridMascotas = (props) => {
    return (
        <div className="container">
            
            {/* Componente filtro, al cual le paso la lista de mascotas perdidas o encontradas que viene de la view padre */}
            <Filtros lista={props.lista} />

        </div>
    );
}

export default GridMascotas;