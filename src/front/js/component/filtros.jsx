import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";


const Filtros = () => {
    const { store } = useContext(Context)
    const [selectedSpecies, setSelectedSpecies] = useState("");

    //Se busca en store las nombres de especie de las mascotas agregadas,
    //y se guardan sin repetir en el array de objetos especies
    const especies = Array.from(new Set(store.mascotas.map(mascota => mascota.especie_name)))
        .map((name, index) => ({ name, id: index + 1 }));

    const handleSpeciesChange = (event) => {
        setSelectedSpecies(event.target.value);
        //hacer la logica para cuando se selecciona una especie en select
    };

    console.log(store.mascotas)
    return(
        <div className="container">

            <div className="row mt-4">
                <div className="col-3 d-flex">
                    
                    <select 
                        className="form-select" 
                        aria-label="Default select example" 
                        value={selectedSpecies} 
                        onChange={handleSpeciesChange}>

                        {/*     map de las opciones extraídas en especies     */}
                        <option value="">Seleccione una especie</option>
                        {especies.map((especie) => (
                            <option key={especie.id} value={especie.name}>
                                {especie.name}
                            </option>
                        ))}
                    </select>

                </div>
                
            </div>
            
        </div>
    );
}

export default Filtros