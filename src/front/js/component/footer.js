import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<div className="container-fluid" style={{backgroundColor: "#040926", color: "#E0E1DD"}}>
		<style>@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap')</style>
  		<footer className="py-3 my-4" style={{fontFamily: "Montserrat"}}>
    		<ul className="nav justify-content-center pb-3 mb-3">
      			<li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Inicio</Link></li>
      			<li className="nav-item"><Link to="/mascotas-perdidas" className="nav-link px-2 text-muted">Perdidas</Link></li>
      			<li className="nav-item"><Link to="/mascotas-encontradas" className="nav-link px-2 text-muted">Encontradas</Link></li>
      			<li className="nav-item"><Link to="/mapa" className="nav-link px-2 text-muted">Mapa</Link></li>
      			<li className="nav-item"><Link to="/preguntas-frecuentes" className="nav-link px-2 text-muted">FAQ</Link></li>
				<li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Contacto</Link></li>
    		</ul>
			<p className="text-center text-muted">Ururguay</p>
    		<p className="text-center text-muted">© 2024 MascotApp</p>
  		</footer>
	</div>
);
