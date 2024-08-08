import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Busqueda } from "../component/busqueda";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid">
			<Busqueda />
		</div>
	);
};
