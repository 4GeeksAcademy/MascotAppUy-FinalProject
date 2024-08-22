import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MascotaPost from "../component/mascotaPost";
import { Context } from "../store/appContext";


 export const VistaMascota = () => {

    const { store } = useContext(Context);
    const { theid } = useParams();
    const [mascota, setMascota] = useState(null);

    useEffect(() => {
        const findMascota = store?.mascotas.find(mascota => mascota.id === parseInt(theid)); // Asegúrate de comparar con el tipo correcto

        if (findMascota) {
            setMascota(findMascota);
        }

        
    }, [store.mascotas, theid]); // Agregar store.mascotas y theid a las dependencias

    if (!mascota) {
        return <div>Cargando ...</div>;
    }

    
    return(
        
    <div>
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
        />
    </div>
    

)
    

}

