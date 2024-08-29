import React from "react";



export const Frecuentes = () => {
 
    return(
        <div className="container mt-5 text-center">
            <h1>Preguntas Frecuentes</h1>
            <div className="mt-5">
                <div className="accordion accordion-flush text-center" id="accordionFlushExample">
                    <div className="accordion-item">
                        <button className="accordion-button collapsed justify-content-center" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        <i className="fa-solid fa-paw" style={{color: "#ff8a5b", marginRight: "10px"}}></i><span className="ms-5 fs-4">¿Cómo elijo la foto más representativa de mi mascota?</span>
                        </button>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Para garantizar que tu mascota sea identificable  y destacada en el sitio, elige una foro que sea clara y de buena calidad. La foto debe capturar bien las características principales de tu mascota y debe ser la más representativa posible. Esto ayudará a otros usuarios a reconocer a tu mascota más rapido.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        <i className="fa-solid fa-paw" style={{color: "#ff8a5b", marginRight: "10px"}}></i><span className="ms-5 fs-4">¿Qué debo incluir en la descripción de mi mascota?</span>
                        </button>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Detalla características como color del pelaje, manchas, tamaño (pequeño, mediano, grande), peso aproximado, longitud del pelaje (corto, largo), etc. Menciona cualquier característica única, como cicatrices, ojos de diferente color, collar con placa, orejas caídas, cojea, etc.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        <i className="fa-solid fa-paw" style={{color: "#ff8a5b", marginRight: "10px"}}></i><span className="ms-5 fs-4">¿Cómo marco la última ubicación conocida de mi mascota?</span>
                        </button>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Inicia sesión y crea una nueva publicación. Al final del formulario, utiliza el mapa para marcar la ubicación de tu mascota y guarda los cambios.</div>
                        </div>
                    </div>
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                        <i className="fa-solid fa-paw" style={{color: "#ff8a5b", marginRight: "10px"}}></i><span className="ms-5 fs-4">¿Cómo navego por el listado de mascotas encontradas y perdidas?</span>
                        </button>
                        <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">En la página de inicio, verás algunas mascotas encontradas y perdidas. Usa el botón "Ver más" para ver todas. También puedes acceder a mas secciones desde el menu en el tope o pie de la pagina y hacer clic en cualquier mascota para ver más detalles.</div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>


           
         
    )
};