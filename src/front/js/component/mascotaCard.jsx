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
    }, []);

    const getBadgeClass = (estado) => {
        switch (estado) {
            case 'PERDIDO':
                return 'badge-PERDIDO';
            case 'ENCONTRADO':
                return 'badge-ENCONTRADO';
            case 'en REUNDIO':
                return 'badge-REUNIDO';
            case 'ADOPCION':
                return 'badge-ADOPCION';
        }
    };
    //
 

    return (
        
        
        
        <div className="mascotacard card mt-5" style={{ width: "16rem", cursor: "pointer" }} onClick={() => navigate(`/mascota/${props.id}`)}>
            <div className={`badge ${getBadgeClass(props.estado)}`}>
                    {props.estado}
                </div>

            <img src={props.imgSrc} className="card-img-top" alt="random-img" />
            <div className="card-body">
            <style>@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap')</style>
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
