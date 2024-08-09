import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoClaro from "../../img/logoClaro.png"

export const Navbar = () => {
	const nav = useNavigate();
	const location = useLocation();
	

	return (
		<header className="d-flex flex-wrap justify-content-center" style={{backgroundColor: "#040926", color: "#E0E1DD"}}>
    		<div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
				<button id="botonPrincipal" onClick={() => nav("/")}>
					<img src={logoClaro} alt="Logo" style={{width: "90px", height: "90px"}}/>
      				
				</button>
   			</div>
    <ul className="nav nav-pills" style={{alignItems: "center"}}>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Encontradas</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Perdidas</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Mapa</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQ</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Contacto</a></li>

	  {location.pathname !== '/form-login' && (
          <li className="nav-item">
            <Link to="/form-login" className="btn btn-secondary my-2" id="loginButton">
              LOGIN
            </Link>
          </li>
        )}

{location.pathname !== '/form-signin' && (
  <li className="nav-item">
    <Link to="/form-signin" className="btn btn-secondary my-2" id="signinButton">
      SIGN IN
    </Link>
  </li>
)}


	</ul>
  </header>

	);
};
