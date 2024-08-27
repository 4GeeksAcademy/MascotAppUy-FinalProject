import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoClaro from "../../img/logoClaro2.png"
import logoClaroGif from "../../img/logoClaro2.gif"
import "../../styles/navbar.css"

export const Navbar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { store, actions } = useContext(Context);
  const userName = store.user?.nombre;
  const initial = userName ? userName.charAt(0).toUpperCase() : '';

  return (

    
    <nav className="navbar navbar-expand-md navbar-dark sticky-top">
      <style>@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap')</style>
      <div className="container-fluid" id="nav">
        

            <Link to="/" className="navbar-brand d-flex align-items-center">
            <div className="image-container d-flex align-items-center pe-0 me-0">
                <img src={logoClaro} alt="Static Image" className="static-image pb-0" />
                <img src={logoClaroGif} alt="Animated Image" className="animated-image pb-0" />
            </div>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
            
            <ul className="navbar-nav ms-auto">
                <li className="nav-item d-flex justify-content-end">
                <Link to="/mascotas-encontradas" className="nav-link">
                    <button type="button" className="button-no-border btn btn-outline-light">Encontradas</button>
                </Link>
                </li>
                <li className="nav-item d-flex justify-content-end">
                <Link to="/mascotas-perdidas" className="nav-link">
                    <button type="button" className="button-no-border btn btn-outline-light">Perdidas</button>
                </Link>
                </li>
                <li className="nav-item d-flex justify-content-end">
                <Link to="/mascotasReunidos" className="nav-link">
                    <button type="button" className="button-no-border btn btn-outline-light">Reunidas</button>
                </Link>
                </li>
                <li className="nav-item d-flex justify-content-end">
                <Link to="/mapa" className="nav-link">
                    <button type="button" className="button-no-border btn btn-outline-light">Mapa</button>
                </Link>
                </li>
                <li className="nav-item d-flex justify-content-end">
                <Link to="/contacto" className="nav-link">
                    <button type="button" className="button-no-border btn btn-outline-light">Contacto</button>
                </Link>
                </li>
                {store.user ? (
                <>
                    <li className="nav-item d-flex justify-content-end">
                    <Link to="/" className="nav-link text-danger" onClick={actions.logout}>
                        <button type="button" className="btn btn-outline-light">Cerrar sesión</button>
                    </Link>
                    </li>
                    <li className="nav-item d-flex justify-content-end">
                    <Link to="/profile" className="nav-link">
                        
                        <button type="button" className="profile-name btn btn-outline-light mb-1">
                        {store.user.url_image ? (
                            <img src={store.user.url_image} alt="Profile" className="profile-image" />
                            ) : (
                            initial
                            )}  
                        </button>
                    </Link>
                    </li>
                </>
                ) : (
                <>
                    {location.pathname !== '/form-login' && (
                    <li className="nav-item d-flex justify-content-end">
                        <Link to="/form-login" className="nav-link">
                        <button type="button" className="boton-ingresar btn btn-outline-light">Ingresar</button>
                        </Link>
                    </li>
                    )}
                    {location.pathname !== '/form-signup' && (
                    <li className="nav-item d-flex justify-content-end">
                        <Link to="/form-signup" className="nav-link">
                        <button type="button" className="boton-registrarse btn btn-outline-light">Registrarse</button>
                        </Link>
                    </li>
                    )}
                </>
                )}
            </ul>
           
        </div>
      </div>
    </nav>
  );
};



