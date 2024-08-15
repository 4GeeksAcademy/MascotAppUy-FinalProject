import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Busqueda } from "../component/busqueda";
import MascotaCarrousel from "../component/mascotaCarrousel.jsx";
import { Frecuentes } from "../component/preguntasFrecuentes.js";

export const Home = () => {
	const { store, actions } = useContext(Context);

	//Muestra últimas 12 mascotas perdidas posteadas
	const ultimasDiezPerdidas = store.mascotas
	.filter(mascota => mascota.estado === 'PERDIDO')
	.sort((a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro))
	.slice(0, 12);

	//Muestra últimas 12 mascotas encontradas posteadas
	const ultimasDiezEncontradas = store.mascotas
	.filter(mascota => mascota.estado === 'ENCONTRADO')
	.sort((a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro))
	.slice(0, 12);
	
	return (
		<div className="container-fluid">
			<Busqueda />

			<MascotaCarrousel titulo="Mascotas perdidas" lista={ultimasDiezPerdidas} carouselId="carouselPerdidas"/>

			<MascotaCarrousel titulo="Mascotas encontradas" lista={ultimasDiezEncontradas} carouselId="carouselEncontradas"/>

			<Frecuentes />

		</div>
	);
};
