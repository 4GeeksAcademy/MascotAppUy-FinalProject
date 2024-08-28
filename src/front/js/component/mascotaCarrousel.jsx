import React from "react";
import MascotaCard from "./mascotaCard.jsx";
import "../../styles/mascotaCarrousel.css"
import { Link } from "react-router-dom";


const MascotaCarrousel = (props) => {
    const doceMasRecientes = props.lista;
    


    return (
        <div className="container">
            <div className="mt-5 d-flex justify-content-between align-items-center">
                <div className="titulo-carrusel">
                    <h4>{props.titulo} -  <span className="fw-light">Mas recientes</span></h4>
                </div>
                <div className="ver-mas">
                    <Link to={props.path} className="btn btn-sm boton-vermas">Ver más</Link>
                </div>

            </div>

            <div className="slider">
            
                
                <div className="slider-track m-0">
                    {doceMasRecientes.map((mascota, index) => (
                        <div className="slide py-0 mx-3" key={index}>
                            <MascotaCard
                                imgSrc={mascota.url_image}
                                id={mascota.id}
                                nombre={mascota.nombre}
                                fecha={mascota.fecha_registro}
                                especie={mascota.especie_name}
                                localidad={mascota.localidad_name}
                                departamento={mascota.departamento_name}
                                estado={mascota.estado}
                            />
                        </div>
                    ))}
                    {/* Repetimos el contenido para crear el efecto infinito */}
                    {doceMasRecientes.map((mascota, index) => (
                        <div className="slide py-0 mx-3" key={index + doceMasRecientes.length}>
                            <MascotaCard
                                imgSrc={mascota.url_image}
                                id={mascota.id}
                                nombre={mascota.nombre}
                                fecha={mascota.fecha_registro}
                                especie={mascota.especie_name}
                                localidad={mascota.localidad_name}
                                estado={mascota.estado}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default MascotaCarrousel;