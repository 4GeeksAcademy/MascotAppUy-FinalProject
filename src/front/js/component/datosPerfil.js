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
            <div className="d-flex justify-content-center mb-5">
                <button type="button" className="profile-big-name btn btn-outline-light mb-1">{initial}</button>
                
            </div>
            <h1>{store.user.nombre}</h1>

            <div className="profile-details text-center">
                <h6>Email: {store.user.email}</h6>
                <h6>Nombre: {store.user.nombre}</h6>
                <h6>Telefono: {store.user.telefono}</h6>
                <h6>Contraseña: ******</h6>

                <div className="button-group d-flex justify-content-center mt-3">
                    <button type="button" className="btn btn-outline-dark btn-sm" onClick={props.editDatos}>
                        <i className="fas fa-edit"></i> Editar datos
                    </button>
                    <button type="button" className="btn btn-outline-dark btn-sm ms-2" onClick={props.editPassword}>
                        <i className="fas fa-edit"></i> Cambiar contraseña
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DatosPerfil;