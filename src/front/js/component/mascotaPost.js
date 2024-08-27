import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/mascotaPost.css";



const MascotaPost = (props) => {


  

    return(
        <>
        {props.estado == "PERDIDO" ? (<h1 className="text-center" style={{marginTop: "40px", fontFamily: "Montserrat", textShadow: "1px 1px 1px #aaa"}}>Estoy perdido!</h1>) : 
            (<h1 className="text-center" style={{marginTop: "40px", fontFamily: "Montserrat" , textShadow: "1px 1px 1px #aaa"}}>Estoy buscando a mi familia!</h1>)}
        
           
    
    
            <div className="card mb-3" id="perrito">
                <div className="row g-1">


                    <div className="col-md-6 col-lg-6 col-sm-12">
                        <img src={props.imagen} className="mascota-img" alt="Mascota" />
                    </div>
    
                    <div className="col-md-6 col-lg-6 col-sm-12">
                        <div className="cardBody">
                            {props.estado == "PERDIDO" ? 
                            (<><p><strong>Nombre: </strong> {props.nombre}</p>
                            <p><strong>Especie: </strong> {props.especie}</p>
                            <p><strong>Raza: </strong> {props.raza}</p>
                            <p><strong>Edad: </strong> {props.edad}</p>
                            <p><strong>Sexo: </strong>: {props.sexo}</p>
                            <p><strong>Fecha de perdido: </strong> {props.fechaPerdido}</p>
                            <p><strong>Descripcion: </strong> {props.descripcion}</p>
                            <p><strong>Se perdió en: </strong> {props.localidad}, {props.departamento}</p>

                            <button 
                                data-bs-toggle="modal" 
                                data-bs-target="#exampleModal" 
                                style={{ border: "none", backgroundColor: "#FF8A5B", padding: "5px 10px", width: "40%", margin: "0 auto", borderRadius: "20px", color: "#040926", fontWeight: "500" }}>Contactar al dueño</button>
                
                
                
                
                
                
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Contacto del dueño de esta mascota:</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Nombre: </strong> {props.nombreUser}</p>
                            <p><strong>Email: </strong> {props.email}</p>
                            {props.telefono && (<p><strong>Teléfono: </strong> {props.telefono}</p>)}
                        </div>
                        </div>
                    </div>
                    </div>
                </>
                ) : (<> <p><strong>Título: </strong> {props.nombre}</p>
                    <p><strong>Especie: </strong> {props.especie}</p>
                    <p><strong>Raza: </strong> {props.raza}</p>
                    <p><strong>Fecha de registro: </strong> {props.fechaReg}</p>
                    <p><strong>Descripción: </strong>: {props.descripcion}</p>
                    <p><strong>Fue encontrado en: </strong> {props.localidad}, {props.departamento}</p>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ border: "none", backgroundColor: "#FF8A5B", padding: "5px 10px", width: "40%", margin: "0 auto", margin: "0 auto", borderRadius: "20px", color: "#040926", fontWeight: "500" }}>Soy el dueño</button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><strong>Contacto de la persona que registró a la mascota</strong></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Nombre: </strong> {props.nombreUser}</p>
                            <p><strong>Email: </strong> {props.email}</p>
                            {props.telefono && (<p><strong>Teléfono: </strong> {props.telefono}</p>)}
                        </div>
                        </div>
                    </div>
                    </div>
                    </>
                )}

                
              </div>  
             </div>
        </div>
        
    </div>
     
     </>


    )

}

export default MascotaPost;