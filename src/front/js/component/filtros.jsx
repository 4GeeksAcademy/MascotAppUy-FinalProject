import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";


const Filtros = () => {
    const { store } = useContext(Context)
    const [especieSelected, setEspecieSelected] = useState("");
    const [especieArray, setEspecieArray] = useState([]);
    


    const handleSpeciesChange = async (e) => {

        setEspecieSelected(e.target.value)
        setEspecieArray(store.mascotas.filter(mascota => mascota.especie_name == especieSelected));
        
    }
    
    useEffect(()=> {
        console.log(especieSelected);
        console.log(especieArray);
        
    },[especieSelected])

    // console.log(store.mascotas)
    return(
        <div className="container">

            <div className="row mt-4">
                <div className="col-3 d-flex">
                    
                    <select 
                        className="form-select" 
                        aria-label="Default select example" 
                        value={especieSelected} 
                        onChange={handleSpeciesChange}>

                        {/*     map de las opciones extraídas en especies     */}
                        <option value="">Seleccione una especie</option>
                        {store.especies.map((especie, index) => (
                            <option key={index} value={especie}>
                                {especie}
                            </option>
                        ))}
                    </select>

                </div>
                
            </div>
            
        </div>
    );
}

export default Filtros