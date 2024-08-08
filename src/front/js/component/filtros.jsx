import React, { useContext } from "react";
import { Context } from "../store/appContext.js";


const Filtros = () => {
    const { store } = useContext(Context)
    //agregar logica del filtro

    console.log(store.mascotas)
    return(
        <div className="container">

            <div className="row mt-4">
                <div className="col-3 d-flex">
                    <p className="filtro-label me-3">Especie </p>

                    <select className="form-select" aria-label="Default select example">
                            
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>

                </div>
                
            </div>
            
        </div>
    );
}

export default Filtros