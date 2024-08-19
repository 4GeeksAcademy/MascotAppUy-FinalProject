import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<div className="container-fluid" style={{backgroundColor: "#040926", color: "#E0E1DD"}}>
  		<footer className="py-3 my-4">
    		<ul className="nav justify-content-center pb-3 mb-3">
      			<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Inicio</a></li>
      			<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Perdidas</a></li>
      			<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Encontradas</a></li>
      			<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Mapa</a></li>
      			<li className="nav-item"><Link to="/preguntas-frecuentes" className="nav-link px-2 text-muted">FAQ</Link></li>
				<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Contacto</a></li>
    		</ul>
			<p className="text-center text-muted">Ururguay</p>
    		<p className="text-center text-muted">© 2024 MascotApp</p>
  		</footer>
	</div>
);
