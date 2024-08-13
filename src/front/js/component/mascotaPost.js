import React from "react";

const MascotaPost = () => {
    return(
        <>
    <h1 className="display-4 text-center" style={{marginTop: "20px"}}>Estoy perdido!</h1>
    <div className="d-flex py-5" style={{justifyContent: "center"}} id="perrito">
        
        <div>
             <img src="https://picsum.photos/id/237/536/354" className="..." alt="..."/>
        </div>
    
        <div className="card" style={{width: '400px'}}>
            <div className="card-body">
                <p>Me perdí el día: </p>
                <p>Nombre: </p>
                <p>Raza: </p>
                <p>Sexo: </p>
                <p>Localidad: </p>
                <p>Descripción:   </p>
                <p>Ubicación:    </p>

                <a href="#" className="btn" style={{backgroundColor: "#FF8A5B"}}>Soy el dueño de esta mascota</a>
             </div>
        </div>
    </div>
     
     </>


    )

}

export default MascotaPost;