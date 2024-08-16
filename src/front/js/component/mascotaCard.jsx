import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/allMascotas.css"
import { Context } from "../store/appContext";
import "../../styles/mascotaCard.css"


const MascotaCard = (props) => {
    const { store } = useContext(Context)
    const navigate = useNavigate();
    const { theid } = useParams();
    const [ mascota, setMascota ] = useState(null);
    useEffect(()=> {
        const findMascota = store?.mascotas.find(mascota => mascota.id == theid) 
        
        if(findMascota) {
            setMascota(findMascota)
        }
    }, [])
 

    return (
        <div className="mascotacard card mt-5" style={{ width: "16rem", cursor: "pointer" }} onClick={() => navigate(`/mascota/${props.id}`)}>
            <img src={props.imgSrc} className="card-img-top" alt="random-img" />
            <div className="card-body">
                <h5 className="card-title">{props.nombre}</h5>

                <div className="contenido">
                    <div className="d-flex"><span><i className="fas fa-calendar"  style={{color: "#040926"}}></i></span><p className="card-text ms-2">{props.fecha}</p></div>
                    <div className="d-flex"><span><i className="fas fa-paw" style={{color: "#040926"}}></i></span><p className="card-text ms-2">{props.especie}</p></div>
                    <div className="d-flex"><span><i className="fas fa-map-marker-alt" style={{color: "#040926"}}></i></span><p className="card-text ms-2">{props.localidad}</p></div>
                    
                    
                </div>
                

                
            </div>
        </div>
    );
}

export default MascotaCard
