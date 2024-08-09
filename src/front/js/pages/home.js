import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Busqueda } from "../component/busqueda";
import MascotaCarrousel from "../component/mascotaCarrousel.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	//Muestra últimas 10 mascotas perdidas posteadas
	const ultimasDiezPerdidas = store.mascotas
	.filter(mascota => mascota.estado === 'PERDIDO')
	.sort((a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro))
	.slice(0, 10);

	//Muestra últimas 10 mascotas encontradas posteadas
	const ultimasDiezEncontradas = store.mascotas
	.filter(mascota => mascota.estado === 'ENCONTRADO')
	.sort((a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro))
	.slice(0, 10);

  
  	console.log(ultimasDiezPerdidas);
	  console.log(ultimasDiezEncontradas);

	return (
		<div className="container-fluid">
			<Busqueda />

			<MascotaCarrousel lista={ultimasDiezPerdidas} />

			<MascotaCarrousel lista={ultimasDiezEncontradas} />


		</div>
	);
};
