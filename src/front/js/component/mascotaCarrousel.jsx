import React from "react";
import MascotaCard from "./mascotaCard.jsx";
import "../../styles/mascotaCarrousel.css"


const MascotaCarrousel = (props) => {
    const listaPerdidas = props.lista;

    // Divide la lista en grupos de 4
    const chunkArray = (array, chunkSize) => {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };

    const grupos = chunkArray(listaPerdidas, 4);

    return (
        <div className="container">
            <div id={props.carouselId} className="carousel slide mt-5">
                <div className="carousel-title mt-3">
                    <h4>{props.titulo} - Más recientes</h4>
                </div>
                <div className="carousel-indicators">
                    {grupos.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target={`#${props.carouselId}`}
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {grupos.map((grupo, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                        >
                            <div className="row">
                                {grupo.map((mascota, i) => (
                                    <div key={i} className="col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                                        <MascotaCard
                                            imgSrc={mascota.url_image}
                                            id={mascota.id}
                                            nombre={mascota.nombre}
                                            fecha={mascota.fecha_registro}
                                            especie={mascota.especie_name}
                                            localidad={mascota.localidad_name}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#${props.carouselId}`}
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#${props.carouselId}`}
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default MascotaCarrousel;