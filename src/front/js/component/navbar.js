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
  const userName = store.user?.nombre;
  const initial = userName ? userName.charAt(0).toUpperCase() : '';

  return (

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid"> 
            <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
                <div className="image-container d-flex align-items-center pe-0 me-0">
                   <Link to="/">
                        <img src={logoClaro} alt="Static Image" className="static-image pb-0" />
                        <img src={logoClaroGif} alt="Animated Image" className="animated-image pb-0" />    
                    </Link>
                      
                </div>
                <span>MascotApp</span>  
            <ul className="navbar-nav ms-auto">
                <li className="nav-item d-flex justify-content-end">
                    <Link to="/mascotas-encontradas" className="nav-link"><button type="button" className="button-no-border btn btn-outline-light">Encontradas</button></Link>
                </li>
                <li className="nav-item d-flex justify-content-end">
                    <Link to="/mascotas-perdidas" className="nav-link"><button type="button" className="button-no-border btn btn-outline-light">Perdidas</button></Link>
                </li>
                <li className="nav-item d-flex justify-content-end">
                    <Link to="/mapa" className="nav-link"><button type="button" className="button-no-border btn btn-outline-light">Mapa</button></Link>
                </li>
                <li className="nav-item d-flex justify-content-end">
                    <Link to="#" className="nav-link"><button type="button" className="button-no-border btn btn-outline-light">Contacto</button></Link>
                </li>
                {store.user ? (
                    <>
                    <li className="nav-item d-flex justify-content-end">
                        <Link to="/" className="nav-link text-danger" onClick={actions.logout}><button type="button" className="btn btn-outline-light">Cerrar sesion</button></Link>
                    </li>
                    <li className="nav-item d-flex justify-content-end">
                        <Link to="/profile" className="nav-link"><button type="button" className="profile-name btn btn-outline-light mb-1">{initial}</button></Link>
                    </li> 
                    </> 
                ) : (
                    <>
                    {location.pathname !== '/form-login' && (
                        <li className="nav-item d-flex justify-content-end">
                            <Link to="/form-login" className="nav-link"><button type="button" className="boton-ingresar btn btn-outline-light">Ingresar</button></Link>
                        </li>
                    )}
                    {location.pathname !== '/form-signup' && (
                        <li className="nav-item d-flex justify-content-end">
                            <Link to="/form-signup" className="nav-link"><button type="button" className="boton-registrarse btn btn-outline-light">Registrarse</button></Link>
                        </li>
                    )}
                    </>
                )}
            
            </ul>
            </div>
        </div>
    </nav>
  )
    <header className="navbar navbar-expand-md navbar-dark sticky-top" style={{ backgroundColor: "#040926", color: "#E0E1DD" }}>
      <div className="container">
        <button id="botonPrincipal" className="image-container" onClick={() => nav("/")}>
          <img src={logoClaro} alt="Static Image" className="static-image" />
          <img src={logoClaroGif} alt="Animated Image" className="animated-image" />
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
              <Link to="#" className="nav-link">Mapa</Link>
            </li>
            <li className="nav-item d-flex justify-content-end">
              <Link to="#" className="nav-link">Contacto</Link>
            </li>
            {store.user ? (
              <li className="nav-item dropdown d-flex justify-content-end">
                <button className="nav-link dropdown-toggle btn btn-link text-white" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  Mi perfil
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><Link to="/pagePerfil" className="dropdown-item">Mi perfil</Link></li>
                  <li><Link to="/mis-mascotas" className="dropdown-item">Mis mascotas</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link to="/" className="dropdown-item text-danger" onClick={actions.logout}>Cerrar sesión</Link></li>
                </ul>
              </li>
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
    </header>
  );
};



