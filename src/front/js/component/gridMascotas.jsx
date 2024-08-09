import React from "react";
import MascotaCard from "../component/mascotaCard.jsx";
import Filtros from "../component/filtros.jsx";

const GridMascotas = (props) => {
    return (
        <div className="container">
            <div className="title text-center mt-5">
            <h1>Mascotas Perdidas</h1>
        </div>
        <div className="description text-center mt-4">
            <p>Bienvenido a nuestra sección de mascotas perdidas. Aquí podrás ver una lista de animales que están siendo buscados por sus dueños.</p>
            <p>Si has visto alguna de estas mascotas, por favor, no dudes en contactarnos para ayudar a reunirlas con sus familias.</p>
        </div>

            {/* Componente filtro, al cual le paso la lista de mascotas perdidas que viene de la view padre */}
            <Filtros lista={props.mascotasPerdidas} />

            
        </div>
    );
}

export default GridMascotas;