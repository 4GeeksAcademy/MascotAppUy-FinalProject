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
            case 'REUNIDO':
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
                            <div className="d-flex w-100 align-items-center">
                                <div className="d-flex col-sm-6 col-md-3 col-3">
                                    <span className={`badge ${getBadgeClass(props.estado)} me-2`}>
                                        {props.estado}
                                    </span>
                                </div>
                                <div className="col-sm-6 col-md-9 col-9 fs-4 ms-5">
                                    {props.nombre}
                                </div>
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
                                <div className="card-mascota mb-3" style={{ maxWidth: "300px", minWidth: "100%", objectFit: "cover"}}>
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