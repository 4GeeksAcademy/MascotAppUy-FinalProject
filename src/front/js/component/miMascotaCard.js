import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const MiMascotaCard = (props)=> {

    const { store } = useContext(Context)
    const { theid } = useParams();
    const [ mascota, setMascota ] = useState(null);
    useEffect(()=> {
        const findMascota = store?.mascotas.find(mascota => mascota.id == theid) 
        
        if(findMascota) {
            setMascota(findMascota)
        }
    }, [])
    return(
        <div className="container">
            <div className="accordion accordion-flush text-center" id="accordionFlushExample">
                <div className="accordion-item">
                    <button className="accordion-button collapsed justify-content-center" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${props.id}`} aria-expanded="false" aria-controls={`flush-collapse${props.id}`}>
                        <span className="ms-5 fs-4">{props.nombre}</span>
                    </button>
                    <div id={`flush-collapse${props.id}`} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <div style={{"justifyContent": "center", "display": "flex" }}>
                                <div className="card mb-3" style={{"maxWidth": "540px", "minWidth": "100%"}}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={props.imgSrc} className="imgFluid rounded" style={{"width": "100%", "height": "100%", "maxHeight": "350px"}} />
                                        </div>
                                        <div className="col-md-8" style={{"textAlign": "start", "paddingLeft": "20px"}}> 
                                                <h5 className="cardTitle">Nombre: {props.nombre} </h5>
                                                <p className="cardText">Estado: {props.estado}</p>
                                                <p className="cardText">Edad: {props.edad}</p>
                                                <p className="cardText">Descripción:{props.descripcion}</p>
                                                <p className="cardText">Fecha de perdido: {props.fechaPer}</p>
                                                <p className="cardText">Fecha de registro: {props.fechaReg}</p>
                                                <p className="cardText">Ubicación:</p>
                                           </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}