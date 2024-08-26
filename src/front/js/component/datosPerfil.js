import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/datosPerfil.css"
import { MiMascotaCard } from "./miMascotaCard";


const DatosPerfil = (props) => {

    const { store, actions } = useContext(Context);
    const userName = store.user?.nombre;
    const initial = userName ? userName.charAt(0).toUpperCase() : '';
    const nav = useNavigate();

    const handleDeleteUser = (user) => {
        actions.logout()
        actions.eliminarUsuario(user)
        nav("/")
    }


    return (
        <div className="datos-perfil-container">
            
            <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card">
                        <div className="row g-0">
                            <div className="d-flex justify-content-center">
                                <button type="button" className="profile-big-name btn btn-outline-light mx-3 my-3">{initial}</button>
                            </div>

                            <div className="col-md-2 text-start">
                            </div>
                            
                            <div className="col-md-8 text-start">
                                <div className="card-body">
                                    <h6>Email: {store.user.email}</h6>
                                    <h6>Nombre: {store.user.nombre}</h6>
                                    <div className="d-flex justify-content-between">
                                        <h6>Telefono: {store.user.telefono}</h6><button type="button" className="btn btn-outline-dark btn-sm" onClick={props.editDatos}>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h6>Contraseña: ****** </h6><button type="button" className="btn btn-outline-dark btn-sm" onClick={props.editPassword}>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                    </div>

                                    <div className="button-group d-flex mt-3">
                                </div>

                                <div className="col-md-2 text-start">
                                </div>        
                                        
                                    
                                </div>
                            </div>
                                
                            
                        </div>
                    </div>
                </div>


            <div className="col-sm-6">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Mis mascotas</h5>

                    <div className="mt-5">
                                <div className="accordion accordion-flush" id="accordionFlushExample">

                            {props.misMascotas && props.misMascotas.length > 0 ? (
                                props.misMascotas.map((mascota, index) => (
                                    <div key={index} className="">
                                        {/* <button type="button" className="btn btn-outline-dark btn-sm ml-3 d-flex" onClick={() => setEditMascota(mascota.id)}>
                                            <i className="fas fa-edit"></i>
                                        </button> */}
                                        
                                        <MiMascotaCard  
                                        mascota={mascota} 
                                        imgSrc={mascota.url_image}
                                        nombre={mascota.nombre}
                                        fechaPer={mascota.fecha_perdido}
                                        // especie={mascota.especie_name}
                                        // localidad={mascota.localidad_name}
                                        edad={mascota.edad}
                                        estado={mascota.estado}
                                        descripcion={mascota.descripción}
                                        fechaReg={mascota.fecha_registro}
                                        id={mascota.id}
                                      
                                        />
                                        
                                    </div>
                                    
                                    ))
                            ) : (
                                <p>No tienes mascotas registradas.</p>

                                )}
                                </div>
                            </div>

                    
                </div>
                </div>
            </div>
            </div>

        </div>
    );
};

export default DatosPerfil;