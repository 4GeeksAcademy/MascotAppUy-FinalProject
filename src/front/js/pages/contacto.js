import React, {useState} from "react";
import "../../styles/contacto.css"
const Contacto = () =>{
    const [nombre, setNombre] = useState('');
  
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [motivo, setMotivo] = useState('');
    const [mensaje, setMensaje] = useState('');

    const enviarForm = (e) => {
        e.preventDefault();
     

        setNombre('');
      
        setEmail('');
        setTelefono('');
        setMotivo('');
        setMensaje('');
    }

    return(
        <div className="form-container">
        <h2>Contacto</h2>
        <form onSubmit={enviarForm}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
  
  
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="motivo">Motivo de Contacto:</label>
            <select
              id="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="consulta">Consulta</option>
              <option value="sugerencia">Sugerencia</option>
              <option value="reclamo">Reclamo</option>
            </select>
          </div>
  
          {/* <div className="form-group">
            <label htmlFor="mensaje" cl id="mensaje">Mensaje:</label>
            <textarea
              id="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            ></textarea>
          {/* </div> */}

          <div className="form-floating">
            <textarea className="formControl" placeholder="Mensaje" id="mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} style={{width: "400px"}}></textarea>
            <label htmlFor="#mensaje"></label>
          </div>
   
          <div className="form-group">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
             
    )
}

export default Contacto;