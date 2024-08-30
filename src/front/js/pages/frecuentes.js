import React from "react";



export const Frecuentes = () => {
 
    return(
        <div className="container my-5 pb-5 text-center">
            <h1 className="my-5">Preguntas Frecuentes</h1>
            <div className="my-5 pb-5 d-flex justify-content-center">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        <i className="fa-solid fa-circle-question"></i><span className="ms-5 fs-5">¿Cómo elijo la foto más representativa de mi mascota?</span>
                        </button>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body text-start">
                            <p>Para garantizar que tu mascota sea identificable  y destacada en el sitio, elige una foro que sea clara y de buena calidad.</p>
                            <p>La foto debe capturar bien las características principales de tu mascota y debe ser la más representativa posible.</p>
                            <p>Esto ayudará a otros usuarios a reconocer a tu mascota más rapido.</p>
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        <i className="fa-solid fa-circle-question"></i><span className="ms-5 fs-5">¿Qué debo incluir en la descripción de mi mascota?</span>
                        </button>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body text-start">
                            <p>Detalla características como color del pelaje, manchas, tamaño (pequeño, mediano, grande), peso aproximado, longitud del pelaje (corto, largo), etc.</p>
                            <p>Menciona cualquier característica única, como cicatrices, ojos de diferente color, collar con placa, orejas caídas, cojea, etc.</p></div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        <i className="fa-solid fa-circle-question"></i><span className="ms-5 fs-5">¿Cómo marco la última ubicación conocida de mi mascota?</span>
                        </button>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body text-start">
                            <p>Inicia sesión y crea una nueva publicación.</p>
                            <p>Al final del formulario, utiliza el mapa para marcar la ubicación de tu mascota y guarda los cambios.</p></div>
                        </div>
                    </div>
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                        <i className="fa-solid fa-circle-question"></i><span className="ms-5 me-4 fs-5">¿Cómo navego por el listado de mascotas encontradas y perdidas?</span>
                        </button>
                        <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body text-start">
                            <p>En la página de inicio, verás algunas mascotas encontradas y perdidas. Usa el botón "Ver más" para ver todas.</p>
                            <p>También puedes acceder a mas secciones desde el menu en el tope o pie de la pagina y hacer clic en cualquier mascota para ver más detalles.</p></div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>


           
         
    )
};