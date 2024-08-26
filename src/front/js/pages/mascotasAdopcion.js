import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

const MascotasAdopcion = () => {
    const { store } = useContext(Context);
    const [mascotasAdopcion, setMascotasAdopcion] = useState([]);

    useEffect(() => {
        console.log("store.mascotas:", store.mascotas);
        const filterMascotas = store.mascotas.filter(mascota => mascota.estado === "ADOPCIÓN");
        setMascotasAdopcion(filterMascotas);
    }, [store.mascotas]);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Mascotas en Adopción</h2>
            <div className="row">
                {mascotasAdopcion.length > 0 ? (
                    mascotasAdopcion.map((mascota) => (
                        <div key={mascota.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={mascota.url_image || 'default-image.png'} alt={mascota.nombre} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{mascota.nombre}</h5>
                                    <p className="card-text">{mascota.descripcion}</p>
                                    <Link to={`/mascota/${mascota.id}`} className="btn btn-primary">Ver Detalles</Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No hay mascotas en adopción en este momento.</p>
                )}
            </div>
        </div>
    );
};

export default MascotasAdopcion;