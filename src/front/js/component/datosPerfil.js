import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/datosPerfil.css"

const DatosPerfil = (props) => {

    const { store } = useContext(Context);
    const userName = store.user?.nombre;
    const initial = userName ? userName.charAt(0).toUpperCase() : '';

    return (
        <div className="datos-perfil-container">
            
            <div class="row">
                <div class="col-sm-6 mb-3 mb-sm-0">
                    <div class="card">
                        <div class="row g-0">
                            <div class="col-md-4 d-flex justify-content-center">
                                <button type="button" className="profile-big-name btn btn-outline-light mx-3 my-3">{initial}</button>
                            </div>

                            <div class="col-md-8 text-start">
                                <div class="card-body">
                                    <h6>Email: {store.user.email}</h6>
                                    <h6>Nombre: {store.user.nombre}</h6>
                                    <div className="d-flex justify-content-between">
                                        <h6>Telefono: {store.user.telefono}</h6><button type="button" className="btn btn-outline-dark btn-sm" onClick={props.editDatos}>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h6>Contraseña: ****** </h6><button type="button" className="btn btn-outline-dark btn-sm me-5" onClick={props.editPassword}>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                    </div>

                                    <div className="button-group d-flex mt-3">
                                        
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>


            <div class="col-sm-6">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                </div>
            </div>
            </div>

        </div>
    );
};

export default DatosPerfil;