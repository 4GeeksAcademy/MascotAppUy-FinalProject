import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoClaro from "../../img/logoClaro.png"
import logoClaroGif from "../../img/logo-mascotapp_claro.gif"
import "../../styles/navbar.css"

export const Navbar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { store, actions } = useContext(Context);



  return (
      <nav className="navbar navbar-expand-md navbar-dark sticky-top" style={{ backgroundColor: "#040926", color: "#E0E1DD" }}>
          <div className="container">
              <button id="botonPrincipal" className="image-container pb-0" onClick={() => nav("/")}>
                  <img src={logoClaro} alt="Static Image" className="static-image pb-0" />
                  <img src={logoClaroGif} alt="Animated Image" className="animated-image pb-0" />
              </button>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto">
                      <li className="nav-item d-flex justify-content-end">
                          <Link to="/mascotas-encontradas" className="nav-link">Encontradas</Link>
                      </li>
                      <li className="nav-item d-flex justify-content-end">
                          <Link to="/mascotas-perdidas" className="nav-link">Perdidas</Link>
                      </li>
                      <li className="nav-item d-flex justify-content-end">
                          <Link to="/mapa" className="nav-link">Mapa</Link>
                      </li>
                      <li className="nav-item d-flex justify-content-end">
                          <Link to="#" className="nav-link">Contacto</Link>
                      </li>
                      {store.user ? (
                        <>
                          <li className="nav-item d-flex justify-content-end">
                              <Link to="/" className="nav-link text-danger" onClick={actions.logout}>Cerrar sesión</Link>
                          </li>
                          <li className="nav-item d-flex justify-content-end">
                              <Link to="/profile" className="nav-link text-warning">Mi perfil</Link>
                          </li> 
                        </> 
                      ) : (
                          <>
                              {location.pathname !== '/form-login' && (
                                  <li className="nav-item d-flex justify-content-end">
                                      <Link to="/form-login" className="nav-link text-white">Ingresar</Link>
                                  </li>
                              )}
                              {location.pathname !== '/form-signup' && (
                                  <li className="nav-item d-flex justify-content-end">
                                      <Link to="/form-signup" className="nav-link text-white">Registrarse</Link>
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


        {/* {location.pathname !== '/form-login' && (
          <li className="nav-item"><Link to="/form-login" className="nav-link px-2 text-white">Iniciar sesión</Link></li>
        )}
        {location.pathname !== '/form-signup' && (
          <li className="nav-item"><Link to="/form-signup" className="nav-link px-2 text-white">Registrarse</Link></li>
        )} */}
