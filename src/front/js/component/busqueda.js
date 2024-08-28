import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/busqueda.css";
import { Link as ScrollLink } from "react-scroll";
import Swal from 'sweetalert2';
import InputBuscar from "./inputBuscar";


export const Busqueda = () => {
    const { store, actions } = useContext(Context);
    const nav = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handlePublicar = () => {
        store.user ? nav("/agregarmascota") : Toast.fire({
            icon: "error",
            title: "Debes estar logueado para publicar.",
            showConfirmButton: false
        });
    };


    return (
        <div className="busqueda-container row py-lg-5">
            <style>@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap')</style>
            <div className="col-lg-6 col-md-8 mx-auto text-center">
                <h1 className="mb-5 pb-5">Bienvenidos a MascotApp</h1>
                <h3 className="fw-light mb-4">¿Perdiste a tu mascota?</h3>
                
                <InputBuscar/>

                <div className="divider-container mb-4 mt-5">
                    <hr className="divider-line" />
                    <span className="divider-text fs-6 fw-lighter">O también puedes</span>
                    <hr className="divider-line" />
                </div>

                <div className="boton-container row mb-4 mt-5">
                    <div className="col-12 col-md-6 mb-2 mb-md-0">
                        <button onClick={handlePublicar} className="boton-publicar btn btn-primary w-100">Publicar</button>
                    </div>
                    <div className="col-12 col-md-6">
                        <Link to="/mascotas-adopcion" className="boton-adoptar btn btn-secondary w-100">Adoptar</Link>
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