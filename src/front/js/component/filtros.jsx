import React, { useContext } from "react";
import { Context } from "../store/appContext.js";


const Filtros = () => {
    const { store } = useContext(Context)

    console.log(store.mascotas)
    return(
        <div className="container">
            <div className="filtro-especie">
                <p className="filtro-label">Especie </p>
                
                <select class="form-select" aria-label="Default select example">
                    
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            
        </div>
    );
}

export default Filtros