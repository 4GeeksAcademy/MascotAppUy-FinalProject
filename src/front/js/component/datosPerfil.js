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
        const modal = document.getElementById('exampleModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide(); // Cierra el modal

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
                                <button type="button" className="profile-big-name btn btn-outline-light mx-3 my-5">{initial}</button>
                            </div>

                            <div className="col-md-3 text-start">
                            </div>
                            
                            <div className="col-md-6 text-start">
                                <div className="card-body">
                                    <h6 className="mt-3">Email: {store.user.email}</h6>
                                    <h6 className="mt-4">Nombre: {store.user.nombre}</h6>
                                    <h6 className="mt-4">Telefono: {store.user.telefono}</h6>
                                    <h6 className="mt-4">Contraseña: ****** </h6>

                                    <hr className="my-5"/>
                                    
                                    <div className="mt-4">
                                        <button type="button" className="btn btn-outline-dark btn-sm" onClick={props.editDatos}>
                                            <i className="fas fa-edit"></i>Editar datos
                                        </button>
                                    </div>
                                    
                                   <div className="mt-4">
                                        <button type="button" className="btn btn-outline-dark btn-sm" onClick={props.editPassword}>
                                            <i className="fas fa-edit"></i>Cambiar contraseña
                                        </button>
                                   </div>
                                    
                                    {/* eliminar usuario */}
                                    <div className="mt-4">
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-outline-dark btn-sm">
                                            <i className="fa-solid fa-trash"></i> Eliminar usuario
                                        </button>
                                    </div>
                                    

                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="#exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Deseas eliminar tu cuenta?</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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

                                <div className="col-md-3 text-start">
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
                                        especie={mascota.especie_name}
                                        localidad={mascota.localidad_name}
                                        departamento={mascota.departamento_name}
                                        edad={mascota.edad}
                                        estado={mascota.estado}
                                        descripcion={mascota.descripción}
                                        raza={mascota.raza_name}
                                        sexo={mascota.sexo}
                                        fechaReg={mascota.fecha_registro}
                                        id={mascota.id}
                                        editMascota={() => props.editMascota(mascota.id)} // Paso de la función onEdit
                                        deleteMascota={() => props.deleteMascota(mascota.id)}
                                      
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