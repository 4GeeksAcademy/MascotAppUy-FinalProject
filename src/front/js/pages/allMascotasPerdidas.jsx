import React, { useContext } from "react";
import MascotaCard from "../component/mascotaCard.jsx";
import { Context } from "../store/appContext.js";
import Filtros from "../component/filtros.jsx";

const AllMascotasPerdidas = () => {
    const { store } = useContext(Context)
    console.log(store.mascotas)
    
    //filtro para mostrar únicamente mascotas con estado: Perdido
    const mascotasPerdidas = store.mascotas.filter(mascota => mascota.estado == 'PERDIDO');
    
    return (
        <div className="container">
            <div className="title text-center mt-5">
            <h1>Encuentra Mascotas Perdidas</h1>
        </div>
        <div className="description text-center mt-4">
            <p>Bienvenido a nuestra sección de mascotas perdidas. Aquí podrás ver una lista de animales que están siendo buscados por sus dueños.</p>
            <p>Si has visto alguna de estas mascotas, por favor, no dudes en contactarnos para ayudar a reunirlas con sus familias.</p>
        </div>

            <Filtros />

            <div className="row d-flex justify-content-center gx-5">
                {mascotasPerdidas.map((mascota, index) => (
                    <div key={index} className="col-md-6 col-sm-12 col-lg-4 col-xxl-3 mb-4">
                        <MascotaCard
                            imgSrc={"https://picsum.photos/200"}
                            nombre={mascota.nombre}
                            fecha={mascota.fecha_perdido}
                            especie={mascota.especie_name}
                            localidad={mascota.localidad_name}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllMascotasPerdidas;