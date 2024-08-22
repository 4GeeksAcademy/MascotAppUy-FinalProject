import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/mascotaPost.css";



const MascotaPost = (props) => {


  

    return(
        <>
    {props.estado == "PERDIDO" ? (<h1 className="display-4 text-center" style={{marginTop: "20px"}}>Estoy perdido!</h1>) : 
    (<h1 className="display-4 text-center" style={{marginTop: "20px"}}>Estoy buscando a mi familia!</h1>)}
    
    <div className="d-flex py-5" style={{justifyContent: "center"}} id="perrito">
        
        <div>
             <img src={props.imagen} className="img-fluid rounded" style={{ width: "100%", height: "100%", maxHeight: "350px", maxWidth:"350px" }} alt="Mascota" />
        </div>
    
        <div className="card" style={{width: '400px'}}>
            <div className="card-body" style={{"display": "grid"}}>
                {props.estado == "PERDIDO" ? 
                (<><p>Nombre: {props.nombre}</p>
                <p>Especie: {props.especie}</p>
                <p>Raza: {props.raza}</p>
                <p>Edad: {props.edad}</p>
                <p>Sexo: {props.sexo}</p>
                <p>Fecha de perdido: {props.fechaPerdido}</p>
                <p>Descripción: {props.descripcion}</p>
                <p>Se perdió en: {props.localidad}, {props.departamento}</p>
                <button style={{"justifyContent": "center", border: "none", backgroundColor: "orange"}}>Contactar al dueño</button>
                </>
                ) : (<> <p>Título: {props.nombre}</p>
                    <p>Especie: {props.especie}</p>
                    <p>Raza: {props.raza}</p>
                    <p>Fecha de registro: {props.fechaReg}</p>
                    <p>Descripción: {props.descripcion}</p>
                    <p>Fue encontrado en: {props.localidad}, {props.departamento}</p>
                    <button style={{"justifyContent": "center", border: "none", backgroundColor: "orange"}}>Soy el dueño</button>
                    </>
                )}

                
                
             </div>
        </div>
    </div>
     
     </>


    )

}

export default MascotaPost;