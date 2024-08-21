import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";


const Badges = (props) => {

    const { store } = useContext(Context)
    const { theid } = useParams();
    const [ mascota, setMascota ] = useState(null);
    useEffect(()=> {
        const findMascota = store?.mascotas.find(mascota => mascota.id == theid) 
        
        if(findMascota) {
            setMascota(findMascota)
        }
    }, [])
    return(
        
        <span class="badge bg-dark">Dark</span>
    )
}

export default Badges;