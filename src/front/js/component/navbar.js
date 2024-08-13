import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoClaro from "../../img/logoClaro.png"
import logoClaroGif from "../../img/logo-mascotapp_claro.gif"

export const Navbar = () => {
	const nav = useNavigate();
	const location = useLocation();
  const { store, actions } = useContext(Context)

	
	return (
		<header className="d-flex flex-wrap justify-content-center sticky-top" style={{backgroundColor: "#040926", color: "#E0E1DD"}}>
    	<div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
        <button id="botonPrincipal" className="image-container" onClick={() => nav("/")}>
          <img src={logoClaro} alt="Static Image" className="static-image"/>
          <img src={logoClaroGif} alt="Animated Image" className="animated-image"/>
        </button>
   		</div>
      <ul className="nav nav-pills" style={{alignItems: "center"}}>
        <li className="nav-item"><Link to="/mascotas-encontradas" className="nav-link px-2 text-muted">Encontradas</Link></li>
        <li className="nav-item"><Link to="/mascotas-perdidas" className="nav-link px-2 text-muted">Perdidas</Link></li>
        <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Mapa</Link></li>
        <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">FAQ</Link></li>
        <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Contacto</Link></li>
        {store.user ? (
          <>
            <li className="nav-item"><Link to="/" className="nav-link px-2 text-danger" onClick={actions.logout}>Cerrar sesión</Link></li>
          </>
        ) : (
          <>
          {location.pathname !== '/form-login' && (
            <li className="nav-item"><Link to="/form-login" className="nav-link px-2 text-white">Ingresar</Link></li>
          )}
          {location.pathname !== '/form-signup' && (
            <li className="nav-item"><Link to="/form-signup" className="nav-link px-2 text-white">Registrarse</Link></li>
          )}
        </>
          // <>
          //   <li className="nav-item"><Link to="/form-login" className="nav-link px-2 text-white">Ingresar</Link></li>
          //   <li className="nav-item"><Link to="/form-signup" className="nav-link px-2 text-white">Registrarse</Link></li>
          // </>
        )}
      </ul>
    </header>



	);
};


        {/* {location.pathname !== '/form-login' && (
          <li className="nav-item"><Link to="/form-login" className="nav-link px-2 text-white">Iniciar sesión</Link></li>
        )}
        {location.pathname !== '/form-signup' && (
          <li className="nav-item"><Link to="/form-signup" className="nav-link px-2 text-white">Registrarse</Link></li>
        )} */}
