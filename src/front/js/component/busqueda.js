import React from "react";
import { Link } from "react-router-dom";

export const Busqueda = () => {
    return(
        <div className="row py-lg-5" style={{backgroundColor: "#040926", color: "#E0E1DD"}}>
            <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light" style={{textAlign: "center"}}>¿Perdiste a tu mascota?</h1>
                <div className="container mb-3">
                    <input type="text" className="form-control" placeholder="Perro, gato, color, raza, etc."/>
                </div>
                <p className="d-flex" style={{justifyContent: "center"}}>
                    
                    <Link to="/agregarmascota" className="btn btn-primary my-2" id="botonPublicar">Publicar</Link>
                    
                    <Link to="/" className="btn btn-secondary my-2" id="botonAdoptar">Adoptar</Link>
                </p>
            </div>
        </div>
    );
};