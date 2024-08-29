import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Busqueda } from "../component/busqueda";
import MascotaCarrousel from "../component/mascotaCarrousel.jsx";


export const Home = () => {
	const { store, actions } = useContext(Context);
	console.log(store.user);
	
	//Muestra últimas 12 mascotas perdidas posteadas
	const ultimasDocePerdidas = store.mascotas
	.filter(mascota => mascota.estado === 'PERDIDO')
	.sort((a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro))
	.slice(0, 12);

	//Muestra últimas 12 mascotas encontradas posteadas
	const ultimasDoceEncontradas = store.mascotas
	.filter(mascota => mascota.estado === 'ENCONTRADO')
	.sort((a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro))
	.slice(0, 12);
	
	return (
		<div className="container-fluid">
			<Busqueda />

			<div id="explorar">
				<MascotaCarrousel titulo="Mascotas perdidas" lista={ultimasDocePerdidas} carouselId="carouselPerdidas" path="/mascotas-perdidas"/>

				<MascotaCarrousel titulo="Mascotas encontradas" lista={ultimasDoceEncontradas} carouselId="carouselEncontradas" path="/mascotas-encontradas"/>
			</div>
			

		</div>
	);
};
