import React from "react";
import { Link } from "react-router-dom";
import "../../styles/busqueda.css"
import { Link as ScrollLink } from "react-scroll";

export const Busqueda = () => {
    return(
        <div className="busqueda-container row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto text-center">
                <h1 className="mb-5 pb-5">Bienvenidos a MascotApp</h1>
                <h3 className="fw-light mb-4">¿Perdiste a tu mascota?</h3>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Perro, gato, color, raza, etc." 
                    />
                    <button className="buscar btn btn-primary">Buscar</button>
                </div>

                <div className="divider-container mb-4 mt-5">
                    <hr className="divider-line" />
                    <span className="divider-text fs-6 fw-lighter">O también puedes</span>
                    <hr className="divider-line" />
                </div>

                <div className="row mb-4 mt-5">
                    <div className="col-12 col-md-6 mb-2 mb-md-0">
                        <Link to="/agregarmascota" className="boton-publicar btn btn-primary w-100">Publicar</Link>
                    </div>
                    <div className="col-12 col-md-6">
                        <Link to="/" className="boton-adoptar btn btn-secondary w-100">Adoptar</Link>
                    </div>
                </div>

                <div className="explorar-container text-center mt-5">
                    <ScrollLink 
                        to="explorar" 
                        smooth={true} 
                        duration={300} 
                        className="explorar-link"
                    >
                    <div className="explorar-arrow"><i className="fa-solid fa-chevron-down"></i></div>
                    </ScrollLink>
                </div>
            </div>
        </div>
    );
};