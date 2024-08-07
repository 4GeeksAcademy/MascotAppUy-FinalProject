import React from "react";
import { Link } from "react-router-dom";
import logoClaro from "../../img/logoClaro.png"

export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark" style={{backgroundColor: "#040926", color: "#E0E1DD"}}>
			<div className="conteiner-fluid">
				<div className="row">
					<div className="col-6">
						<img src={logoClaro} alt="Logo" style={{width: "80px", height: "80"}}/>
						<h3>MascotApp</h3>
					</div>
					<div className="col-6">
						<p>Encontradas</p>
					</div>
				</div>
			</div>
		</nav>




	);
};
