import React, { useContext } from "react";
import MascotaCard from "../component/mascotaCard.jsx";
import { Context } from "../store/appContext.js";

const AllMascotasEncontradas = () => {

    const { store } = useContext(Context)
    console.log(store.mascotas)
    
    //filtro para mostrar únicamente mascotas con estado: Encontrado
    const mascotasEncontradas = store.mascotas.filter(mascota => mascota.estado == 'ENCONTRADO');
    
    return (
        <div className="container">
            <div className="title text-center mt-5">
                <h1>Mascotas Encontradas</h1>
            </div>
            <div className="description text-center mt-4">
                <p>Bienvenido a nuestra sección de mascotas encontradas. Aquí podrás explorar una lista de animales que han sido hallados por personas y están en busca de sus dueños.</p>
                <p>Si reconoces alguna de estas mascotas y te pertenece o sabes a quién pertenece, por favor, contáctanos para ayudar a reunificar a estas queridas mascotas con sus familias. Tu colaboración es fundamental para que cada animal pueda volver a su hogar.</p>
            </div>

            <div className="row d-flex justify-content-center gx-5">
                {mascotasEncontradas.map((mascota, index) => (
                    <div key={index} className="col-md-6 col-sm-12 col-lg-4 col-xxl-3 mb-4">
                        <MascotaCard
                            imgSrc={"https://picsum.photos/200"}
                            nombre={mascota.nombre}
                            descripcion={mascota.descripcion}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllMascotasEncontradas;