import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    }, []);

    const getBadgeClass = (estado) => {
        switch (estado) {
            case 'PERDIDO':
                return 'badge-PERDIDO';
            case 'ENCONTRADO':
                return 'badge-ENCONTRADO';
            case 'REUNIDO':
                return 'badge-REUNIDO';
            case 'ADOPCION':
                return 'badge-ADOPCION';
        }
    };
    
 

    return (
        
        <div className="card text-bg-dark" id="card-mascota" onClick={() => navigate(`/mascota/${props.id}`)}>
            
            <div className="card-img-wrapper">
                <div className="badge-overlay d-flex justify-content-between align-items-center">
                    <div className={`badge ${getBadgeClass(props.estado)}`}>
                        {props.estado}
                    </div>
                    <div className="fecha">
                        <p className="card-text"><small>{props.fecha}</small></p>
                    </div>
                </div>
                <img src={props.imgSrc} className="card-img" alt={props.nombre} />
            </div>
            <div className="card-img-overlay">
                <h5 className="card-title">{props.nombre}</h5>
                <p className="card-text card-text-localidad">{props.localidad}, {props.departamento}</p>  
            </div>
        </div>
    
        
    );
}

export default MascotaCard
