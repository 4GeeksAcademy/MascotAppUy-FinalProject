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
          <div className="contact" >
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
  
  
          <div className="contact">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div className="contact">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
  
          <div className="contact">
            <label htmlFor="motivo">Motivo de Contacto:</label>
            <select
              id="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
            >
              <option value="" className="text-center">Seleccione una opción</option>
              <option value="consulta" className="text-center">Consulta</option>
              <option value="sugerencia" className="text-center">Sugerencia</option>
              <option value="reclamo" className="text-center">Reclamo</option>
            </select>
          </div>
            <textarea className="contacto text-center" placeholder="Mensaje" id="mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} style={{width: "100%"}}></textarea>
            <label htmlFor="#mensaje"></label>
          <div className="contact">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
             
    )
}

export default Contacto;