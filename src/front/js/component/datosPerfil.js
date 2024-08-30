import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/datosPerfil.css"
import { MiMascotaCard } from "./miMascotaCard.js";

const DatosPerfil = (props) => {

    const { store, actions } = useContext(Context);
    const userName = store.user?.nombre;
    const initial = userName ? userName.charAt(0).toUpperCase() : '';
    const nav = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleDeleteUser = (user) => {
        const modal = document.getElementById('exampleModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide(); // Cierra el modal

        actions.logout()
        actions.eliminarUsuario(user)
        nav("/")
    }

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleUploadImage = async () => {
        if (selectedImage) {
            const formData = new FormData();
            formData.append("file", selectedImage);

            const imageUrl = await actions.uploadImage(formData);
            
            if (imageUrl) {
                const updated = await actions.editarUsuario({ 
                    ...store.user, 
                    url_image: imageUrl 
                });

                if (updated) {
                    // Cerrar el modal después de subir la imagen
                    const modal = document.getElementById('uploadImageModal');
                    const modalInstance = bootstrap.Modal.getInstance(modal);
                    modalInstance.hide(); // Cierra el modal
                } 
            }
        }
    };

    const handleDeleteImage = async () => {
        const updated = await actions.editarUsuario({ 
            ...store.user, 
            url_image: null 
        });
    
        if (updated) {
            setSelectedImage(null); // Limpiar la imagen seleccionada
            const modal = document.getElementById('uploadImageModal');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide(); // Cierra el modal
        }
    };

    return (
        <div className="datos-perfil-container container-fluid">
            <div className="row">
                <div className="col-sm-12 col-md-6 mb-3 mb-md-0">
                    <div className="card">
                        <div className="row g-0">
                            <div className="d-flex justify-content-center">
                                <div className="profile-image-container position-relative">
                                    <button type="button" className="profile-big-name btn btn-outline-light mx-3 my-5" data-bs-toggle="modal" data-bs-target="#uploadImageModal">
                                        {store.user.url_image ? (
                                            <img src={store.user.url_image} alt="Profile" className="profile-image" />
                                        ) : (
                                            initial
                                        )}
                                        <i className="fas fa-edit edit-icon"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="col-md-0 col-sm-0 col-lg-2 col-xl-3"></div>

                            <div className="col-md-12 col-sm-12 col-lg-8 col-xl-6 text-start">
                                <div className="card-body">
                                    <h6>Email: {store.user.email}</h6>
                                    <h6>Nombre: {store.user.nombre}</h6>
                                    <h6>Telefono: {store.user.telefono}</h6>
                                    {!store.googleLogin && <h6>Contraseña: ****** </h6>}

                                    <hr className="my-5"/>
                                    
                                    <div className="mt-4">
                                        <a href="#" className="btn p-0" role="button" data-bs-toggle="button" onClick={props.editDatos}>
                                        <i className="fas fa-edit me-2"></i>Editar datos</a>
                                    </div>
                                    
                                   {!store.googleLogin && <div className="mt-4">
                                        <a href="#" className="btn p-0" role="button" data-bs-toggle="button" onClick={props.editPassword}>
                                        <i className="fas fa-edit me-2"></i>Cambiar contraseña</a>
                                   </div>}
                                    
                                    {/* eliminar usuario */}
                                    <div className="my-4">
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-link text-dark p-0 text-decoration-none">
                                            <i className="fa-solid fa-trash me-2"></i>Eliminar usuario
                                        </button>
                                    </div>

                                    <div className="col-md-0 col-sm-0 col-lg-2 col-xl-3"></div>

                                    {/* Modal para subir imagen */}
                                    <div className="modal fade" id="uploadImageModal" tabIndex="-1" aria-labelledby="uploadImageModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="uploadImageModalLabel">Sube una imagen de perfil</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="input-group mb-3">
                                                        <input type="file" className="form-control" id="inputGroupFile01" onChange={handleImageChange} />
                                                    </div>
                                                    {store.user.url_image && (
                                                        <div className="mt-3">
                                                            <button type="button" className="btn btn-danger" onClick={handleDeleteImage}>Eliminar imagen</button>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                    <button type="button" className="btn btn-primary" onClick={handleUploadImage}>Subir</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* modal para eliminar usuario */}
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Deseas eliminar tu cuenta?</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    Tené en cuenta que al eliminar tu cuenta en MascotApp, también se eliminarán todas las publicaciones que realizaste.
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                    <button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(store.user.id)}>Eliminar cuenta</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-sm-12">
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