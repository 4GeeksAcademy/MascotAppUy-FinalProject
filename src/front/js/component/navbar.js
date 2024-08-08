import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoClaro from "../../img/logoClaro.png"

export const Navbar = () => {
	const nav = useNavigate();
	return (
		<header className="d-flex flex-wrap justify-content-center" style={{backgroundColor: "#040926", color: "#E0E1DD"}}>
    		<div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
				<button id="botonPrincipal" onClick={() => nav("/")}>
					<img src={logoClaro} alt="Logo" style={{width: "90px", height: "90px"}}/>
      				
				</button>
   			</div>

		<ul className="nav nav-pills" style={{alignItems: "center"}}>
			<li className="nav-item"><Link to="/mascotas-encontradas" className="nav-link px-2 text-muted">Encontradas</Link></li>
			<li className="nav-item"><Link to="/mascotas-perdidas" className="nav-link px-2 text-muted">Perdidas</Link></li>
			<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Mapa</a></li>
			<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQ</a></li>
			<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Contacto</a></li>
			<li className="nav-item"><a href="#" className="btn btn-secondary my-2" id="loginButton">LOGIN</a></li>
			<li className="nav-item"><a href="#" className="btn btn-secondary my-2" id="singupButton">SIGNUP</a></li>
		</ul>
  </header>





	);
};
