import React from "react";

export const Busqueda = () => {
    return(
        <div className="row py-lg-5" style={{backgroundColor: "#040926", color: "#E0E1DD"}}>
            <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light" style={{textAlign: "center"}}>¿Perdiste a tu mascota?</h1>
                <div className="mb-3">
                    <input type="text" class="form-control" placeholder="Perro, gato, color, raza, etc."/>
                </div>
                <p className="d-flex" style={{justifyContent: "center"}}>
                    <a href="#" className="btn btn-primary my-2" id="botonPublicar">Publicar</a>
                    
                    <a href="#" className="btn btn-secondary my-2" id="botonAdoptar">Adoptar</a>
                </p>
            </div>
        </div>
    );
};