import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const MiMascotaCard = (props)=> {

    const { store } = useContext(Context);
    const { theid } = useParams();
    const [ mascota, setMascota ] = useState(null);
    useEffect(()=> {
        const findMascota = store?.mascotas.find(mascota => mascota.id == theid)
        if(findMascota) {
            setMascota(findMascota)
        }
    }, [])

    return(
        <>
    <div style={{"justifyContent": "center", "display": "flex" }}>
        <div className="card mt-3" style={{"width": "18rem"}}>
            <img src={props.imgSrc} className="img-fluid rounded-start" />
                <div className="cardBody px-3">
                        <h5 className="cardTitle">Nombre: {props.nombre}</h5>
                        <p className="cardText">Estado: {props.estado}</p>
                        <p className="cardText">Edad:</p>
                        <p className="cardText">Descripción:</p>
                        <p className="cardText">Fecha de perdido:</p>
                        <p className="cardText">Fecha de registro:</p>
                        <p className="cardText">Ubicación:</p>
                </div>
        </div>
    </div>
        
        </>
    
    )}