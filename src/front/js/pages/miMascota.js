import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { MiMascotaCard } from "../component/miMascotaCard";

const MiMascota = () => {

    const { store } = useContext(Context);
    const { theid } = useParams();
    const [ mascota, setMascota ] = useState(null);
    useEffect(()=> {
        const findMascota = store?.mascotas.find(mascota => mascota.id == theid) 
        
        if(findMascota) {
            setMascota(findMascota)
        }
    }, [])
    
    if (!mascota) {
        return <div>Cargando ...</div>;
	}

    return(
       < MiMascotaCard 
        imgSrc={mascota.url_image}
        id={mascota.id}
        nombre={mascota.nombre}
        fecha={mascota.fecha_registro}
        especie={mascota.especie_name}
        localidad={mascota.localidad_name}
                                        />
       
    )
}

export default MiMascota;