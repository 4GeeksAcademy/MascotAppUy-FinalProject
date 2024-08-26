import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/datosPerfil.css"

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
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-outline-dark btn-sm ms-2">
                    <i className="fa-solid fa-trash"></i> Eliminar usuario
                    </button>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" ariaLabelledby="#exampleModalLabel" ariaHidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Deseas eliminar tu cuenta?</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" ariaLabel="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Tené en cuenta que al eliminar tu cuenta en MascotApp, también se eliminarán todas las publicaciónes que realizaste.
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" className="btn btn-primary" style={{backgroundColor: "#c60f0f", border: "none"}} onClick={ () => handleDeleteUser(store.user.id)}>Eliminar cuenta</button>
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