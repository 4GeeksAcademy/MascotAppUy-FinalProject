import React, { useContext } from "react";
import MascotaCard from "../component/mascotaCard.jsx";
import { Context } from "../store/appContext";

const AllMascotas = () => {
    const { store } = useContext(Context)

    return (
        <div className="container">
            <div className="row d-flex justify-content-center gx-5">
                {store.mascotas.map((mascota, index) => (
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

export default AllMascotas;