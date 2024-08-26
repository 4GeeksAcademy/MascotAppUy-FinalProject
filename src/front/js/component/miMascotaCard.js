import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/mascotaUsuario.css"

export const MiMascotaCard = (props) => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams();
    const [mascota, setMascota] = useState(null);

    useEffect(() => {
        const findMascota = store?.mascotas.find(mascota => mascota.id == theid);
        if (findMascota) {
            setMascota(findMascota);
            
            
        }
    }, [store, theid]);

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

    return (
        <div className="container">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id={`flush-heading${props.id}`}>
                        <button 
                            className="accordion-button collapsed d-flex justify-content-between align-items-center" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target={`#flush-collapse${props.id}`} 
                            aria-expanded="false" 
                            aria-controls={`flush-collapse${props.id}`}
                            style={{ border: 'none', backgroundColor: '#f8f9fa' }}
                        >
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <div className="fs-4">{props.nombre}<span  className={`badge ${getBadgeClass(props.estado)}`} style={{marginLeft: '20px'}}>{props.estado}</span></div>
                            </div>
                        </button>
                    </h2>
                    <div 
                        id={`flush-collapse${props.id}`} 
                        className="accordion-collapse collapse" 
                        aria-labelledby={`flush-heading${props.id}`} 
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div className="accordion-body">
                            <div className="d-flex justify-content-end align-items-center mb-3">
                                <button 
                                    type="button" 
                                    className="btn btn-outline-dark btn-sm" 
                                    onClick={props.editMascota}
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-outline-dark btn-sm ms-2" 
                                    onClick={props.deleteMascota}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="card mb-3" style={{ maxWidth: "540px", minWidth: "100%" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img 
                                                src={props.imgSrc} 
                                                className="img-fluid rounded" 
                                                style={{ width: "100%", height: "100%", maxHeight: "350px" }} 
                                                alt="Mascota" 
                                            />
                                        </div>
                                        <div className="col-md-8" style={{ textAlign: "start", paddingLeft: "20px", alignContent: 'center'}}>
                                            {props.estado == 'PERDIDO' ? 
                                            (<><h5 className="card-title">Nombre: {props.nombre}</h5>
                                            <p className="card-text">Especie: {props.especie}</p>
                                            <p className="card-text">Raza: {props.raza}</p>
                                            <p className="card-text">Sexo: {props.sexo}</p>
                                            <p className="card-text">Edad: {props.edad}</p>
                                            <p className="card-text">Fecha de registro: {props.fechaReg}</p>
                                            <p className="card-text">Fecha de perdido: {props.fechaPer}</p>
                                            <p className="card-text">Descripción: {props.descripcion}</p>
                                            <p className="card-text">Ubicación: {props.localidad}, {props.departamento}</p></>
                                            ):(
                                            <><h5 className="card-title">Título: {props.nombre}</h5>
                                                <p className="card-text">Especie: {props.especie}</p>
                                                <p className="card-text">Raza: {props.raza}</p>
                                                <p className="card-text">Sexo: {props.sexo}</p>
                                                {props.edad === "" ? (<><br></br></>):(<><p className="card-text">Edad: {props.edad}</p></>)}
                                                <p className="card-text">Descripción: {props.descripcion}</p>
                                                <p className="card-text">Fecha de registro: {props.fechaReg}</p>
                                                <p className="card-text">Ubicación: {props.localidad}, {props.departamento}</p></>
                                            )}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};