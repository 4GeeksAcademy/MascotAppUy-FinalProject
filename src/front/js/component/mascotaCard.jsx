import React, { useContext } from "react";
import "../../styles/allMascotas.css"
import { Context } from "../store/appContext";


const MascotaCard = (props) => {
    const { store } = useContext(Context)

    return (
        <div className="card mt-5" style={{ width: "18rem" }}>
            <img src="https://picsum.photos/200" className="card-img-top" alt="random-img" />
            <div className="card-body">
                <h5 className="card-title">{props.nombre}</h5>
                <p className="card-text">{props.descripcion}</p>
                
            </div>
        </div>
    );
}

export default MascotaCard
