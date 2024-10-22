import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import GridMascotas from "../component/gridMascotas.jsx";
import logoOscuro from "../../img/logo-mascotapp_oscuro.gif"



const AllMascotasEncontradas = () => {

    const { store } = useContext(Context)
    
    //filtro para mostrar únicamente mascotas con estado: Encontrado
    const mascotasEncontradas = store.mascotas.filter(mascota => mascota.estado == 'ENCONTRADO');


    return (
        <div className="container"  style={{ minHeight: "100vh"}}>
            {mascotasEncontradas.length === 0  ? (
                // Muestra el logo si no hay mascotas encontradas
                <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src={logoOscuro} style={{ maxWidth: "70px", maxHeight: "70px" }} alt="Logo" />
                </div>
            ) : (
                // Muestra el contenido de las mascotas encontradas
                <>
                    <div className="title text-center mt-5">
                        <h1>Mascotas Encontradas</h1>
                    </div>
                    <div className="description text-center mt-4">
                        <p>Bienvenido a nuestra sección de mascotas encontradas. Aquí podrás explorar una lista de animales que han sido hallados por personas y están en busca de sus dueños.</p>
                        <p>Si reconoces alguna de estas mascotas y sabes a quién pertenece o si es tuya, por favor, contacta directamente con la persona que publicó el aviso para ayudar a reunificar a estas queridas mascotas con sus familias.</p> 
                        <p>Tu colaboración es fundamental para que cada animal pueda volver a su hogar.</p>
                    </div>

                    <GridMascotas lista={mascotasEncontradas}/>
                </>
            )}
        </div>
    );
        
}

export default AllMascotasEncontradas;
