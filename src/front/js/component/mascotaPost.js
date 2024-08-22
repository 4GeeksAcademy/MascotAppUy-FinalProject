import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/mascotaPost.css";



const MascotaPost = (props) => {


  

    return(
        <>
    {props.estado == "PERDIDO" ? (<h1 className="display-4 text-center" style={{marginTop: "20px"}}>Estoy perdido!</h1>) : 
    (<h1 className="display-4 text-center" style={{marginTop: "20px"}}>Estoy buscando a mi familia!</h1>)}
    <div className="d-flex" style={{justifyContent: "center", alignItems: "center", height: "100vh"}}>
    <div className="card mb-3" style={{maxWidth: "75%", width:"100%"}} id="perrito">
        <div className="row g-0">
        <div className="col-md-4">
             <img src={props.imagen} className="imgFluid rounded" style={{ width: "100%", height: "100%", objectFit: "cover", maxHeight:"400px", maxWidth:"400px" }} alt="Mascota" />
        </div>
    
        <div className="col-md-8">
            <div className="cardBody" style={{"display": "grid", padding: "20px"}}>
                {props.estado == "PERDIDO" ? 
                (<><p>Nombre: {props.nombre}</p>
                <p>Especie: {props.especie}</p>
                <p>Raza: {props.raza}</p>
                <p>Edad: {props.edad}</p>
                <p>Sexo: {props.sexo}</p>
                <p>Fecha de perdido: {props.fechaPerdido}</p>
                <p>Descripción: {props.descripcion}</p>
                <p>Se perdió en: {props.localidad}, {props.departamento}</p>
                <button style={{ border: "none", backgroundColor: "orange", padding: "5px 10px", width: "40%", margin: "0 auto" }}>Contactar al dueño</button>
                </>
                ) : (<> <p>Título: {props.nombre}</p>
                    <p>Especie: {props.especie}</p>
                    <p>Raza: {props.raza}</p>
                    <p>Fecha de registro: {props.fechaReg}</p>
                    <p>Descripción: {props.descripcion}</p>
                    <p>Fue encontrado en: {props.localidad}, {props.departamento}</p>
                    <button style={{ border: "none", backgroundColor: "orange", padding: "5px 10px", width: "40%", margin: "0 auto" }}>Soy el dueño</button>
                    </>
                )}

                
              </div>  
             </div>
        </div>
        </div>
    </div>
     
     </>


    )

}

export default MascotaPost;