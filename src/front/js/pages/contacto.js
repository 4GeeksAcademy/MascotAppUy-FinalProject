import React, {useState} from "react";
import "../../styles/contacto.css"
const Contacto = () =>{
    const [nombre, setNombre] = useState('');
  //
    const [email, setEmail] = useState('');
    const [motivo, setMotivo] = useState('');
    const [mensaje, setMensaje] = useState('');

    const enviarForm = (e) => {
        e.preventDefault();
        setNombre('');
        setEmail('');
      
        setMotivo('');
        setMensaje('');
    }

    return(
        <div className="container">
        

        <div className="mt-5">
        
        <div className="row g-1">
          <div className="col-md-6">
            <h3>¿Quienes somos?</h3>
            <p>Somos un equipo dedicado a conectar a los dueños de mascotas
              con sus mascotas perdidas o encontradas.
              Nuestra misión es hacer que cada encuentro sea significativo y</p>
          </div>


          <div className="col-md-6 d-flex justify-content-center">
            
              <form className="contacto-form w-75" onSubmit={enviarForm}>
              <h2 className="text-center mb-4">Contacto</h2>
                <div className="input-group input-group-sm" >
                  <input
                    
                    type="text"
                    id="nombre"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
      
      
              <div className="input-group input-group-sm">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group input-group-sm">
                <select 
                  className="form-select border-0" 
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
      
              <div className="input-group input-group-sm">
                <textarea
                  className="border-0" 
                  placeholder="Mensaje" 
                  id="mensaje" 
                  value={mensaje} 
                  onChange={(e) => setMensaje(e.target.value)} 
                  style={{width: "100%"}}
                ></textarea>
              </div>
      
            
                <button type="submit" className="btn enviar w-100 mt-2">Enviar</button>
              
            </form>

          </div>

          

        </div>
        
        </div>
      </div>
             
    )
}

export default Contacto;