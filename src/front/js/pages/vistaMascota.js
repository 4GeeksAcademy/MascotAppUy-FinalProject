import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import MascotaPost from "../component/mascotaPost";
import { Context } from "../store/appContext";
import logoOscuro from "../../img/logo-mascotapp_oscuro.gif"



 export const VistaMascota = () => {

    const { store } = useContext(Context);
    const { theid } = useParams();
    const [mascota, setMascota] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const findMascota = store?.mascotas.find(mascota => mascota.id === parseInt(theid)); // Asegúrate de comparar con el tipo correcto

        if (findMascota) {
            setMascota(findMascota);
        }

        
    }, [store.mascotas, theid]); // Agregar store.mascotas y theid a las dependencias

    if (!mascota) {
        return <div className="container" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}><img src={logoOscuro} style={{ maxWidth: "70px", maxHeight: "70px" }} alt="Logo"></img></div>;
    }

    const handleBack = () => {
        // Verificar si hay estado previo almacenado en el location state
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            // Si no hay estado previo, navega a una ruta por defecto
            navigate(-1); // Esto irá hacia atrás en el historial del navegador
        }
    };

    
    return(
        
    <div className="container">
        <div>
        <button 
            type="button" 
            className="btn btn-outline-dark btn-sm mt-4" 
            onClick={handleBack}><i className="fa-solid fa-arrow-left-long"></i></button>
        </div>
        <MascotaPost 
            id = {mascota.id}
            nombre={mascota.nombre}
            fechaReg={mascota.fecha_registro}
            fechaPerdido={mascota.fecha_perdido}
            especie={mascota.especie_name}
            raza={mascota.raza_name}
            departamento={mascota.departamento_name}
            localidad={mascota.localidad_name}
            estado={mascota.estado}
            descripcion={mascota.descripcion}
            edad={mascota.edad}
            sexo={mascota.sexo}
            imagen={mascota.url_image}
            email={mascota.user_email}
            telefono={mascota.user_telefono}
            nombreUser={mascota.user_name}
            coord_x={mascota.coord_x}
            coord_y={mascota.coord_y}
        />
    </div>
    

)
    

}

